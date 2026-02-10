const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');
const parser = new Parser();
const feedsFile = path.join(process.cwd(), 'memory/rss-twitter-sources.md');
let rssUrls = [];
try { rssUrls = fs.readFileSync(feedsFile,'utf8').match(/https:\/\/[^\s]+/g) || []; } catch(e) { rssUrls = []; }

async function fetchTop10(){
  const items = [];
  for (const url of rssUrls.slice(0, 20)) {
    try {
      const feed = await parser.parseURL(url);
      feed.items.slice(0, 5).forEach(it => items.push({title: it.title||'', link: it.link||'', pubDate: it.pubDate, feed: feed.title}));
    } catch(e) {
      // ignore
    }
  }
  const keywords = ['AI','LLM','Claude','OpenAI','Polymarket','Web3','DeFi','Bankless','fintech','creator'];
  items.sort((a,b)=>{
    const sa = keywords.filter(k=> a.title.toLowerCase().includes(k.toLowerCase())).length;
    const sb = keywords.filter(k=> b.title.toLowerCase().includes(k.toLowerCase())).length;
    if (sb!==sa) return sb-sa;
    return new Date(b.pubDate||0) - new Date(a.pubDate||0);
  });
  const top10 = items.slice(0,10).map(it=>`### ${it.title}\n${it.link}\n**Source:** ${it.feed}\n`).join('\n');
  fs.writeFileSync('rss-top10.md', top10);
  console.log('Saved rss-top10.md');
}
fetchTop10();
