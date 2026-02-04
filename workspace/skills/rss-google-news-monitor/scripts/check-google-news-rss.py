#!/usr/bin/env python3
import json
import sys
import os
from datetime import datetime
from urllib.parse import quote_plus, urlparse
import urllib.request
from xml.etree import ElementTree as ET
import hashlib

def build_rss_url(query, days=1, lang='en-GB', country='GB'):
    q = quote_plus(query)
    return f'https://news.google.com/rss/search?q={q}&when:{days}d&hl={lang}&gl={country}&ceid={country}:{lang}'

def entry_id(title, link):
    return hashlib.md5((title + link).encode()).hexdigest()

def load_state(path='../rss-state.json'):
    try:
        with open(path, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {'feeds': {}, 'last_check': {}}

def save_state(state, path='../rss-state.json'):
    with open(path, 'w') as f:
        json.dump(state, f)

def check_feed(rss_url, feed_id, state):
    req = urllib.request.Request(rss_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        content = response.read()
    root = ET.fromstring(content)
    ns = {'atom': 'http://www.w3.org/2005/Atom'}
    entries = root.findall('.//atom:entry', ns)
    new_items = []
    seen_ids = state.get('feeds', {}).get(feed_id, set())
    
    for entry in entries[:10]:
        title_elem = entry.find('atom:title', ns)
        title = title_elem.text if title_elem is not None else ''
        link_elem = entry.find('atom:link[@rel="alternate"]', ns)
        link = link_elem.get('href') if link_elem is not None else ''
        pub_elem = entry.find('atom:published', ns)
        pub_date = pub_elem.text if pub_elem is not None else ''
        summary_elem = entry.find('atom:summary', ns)
        summary = summary_elem.text[:200] if summary_elem is not None else ''
        entry_id = entry_id(title, link)
        if entry_id not in seen_ids:
            new_items.append({
                'title': title,
                'link': link,
                'pubDate': pub_date,
                'summary': summary
            })
            seen_ids.add(entry_id)
    
    state['feeds'][feed_id] = list(seen_ids)
    state['last_check'][feed_id] = datetime.now().isoformat()
    save_state(state)
    
    return new_items

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python check-google-news-rss.py "query" [feed_id]')
        sys.exit(1)
    
    query = sys.argv[1]
    feed_id = sys.argv[2] if len(sys.argv) > 2 else query.replace(' ', '_').replace('"', '').replace('OR', '').replace('+', '_')
    rss_url = build_rss_url(query)
    
    state = load_state()
    new = check_feed(rss_url, feed_id, state)
    
    if new:
        print(json.dumps({'new_articles': new, 'count': len(new)}))
    else:
        print(json.dumps({'status': 'no new articles'}))
