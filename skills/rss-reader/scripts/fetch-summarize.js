const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');

const parser = new Parser();

const feedsFile = path.join(process.cwd(), 'memory/rss-twitter-sources.md');
let feedsText = fs.readFileSync(feedsFile, 'utf8');

// Parse feeds (simple regex for RSS URLs)
const rssUrls = feedsText.match(/https:\/\/[^\s]+\/feed[^\s]*/g) || [];

async function fetchTop10() {
  const items = [];
  for (const url of rssUrls.slice(0,20)) { // Top 20 feeds to limit time
    try {
      const feed = await parser.parseURL(url);
      feed.items.slice(0,5).forEach(item => items.push({...item, feed: feed.title}));
    } catch(e) {}
  }

  // Rank by keywords
  const keywords = ['AI', 'LLM', 'Claude', 'OpenAI', 'prediction market', 'Polymarket', 'Web3', 'DeFi', 'Bankless', 'fintech', 'creator economy'];
  items.sort((a,b) => {
    const scoreA = keywords.some(k => a.title.toLowerCase().includes(k.toLowerCase())) ? 1 : 0;
    const scoreB = keywords.some(k => b.title.toLowerCase().includes(k.toLowerCase())) ? 1 : 0;
    return scoreB - scoreA || new Date(b.pubDate) - new Date(a.pubDate);
  });

  const top10 = items.slice(0,10).map(item => `
### ${item.title}
${item.link}
**Summary:** TODO AI SUMMARY HERE (spawn agent or truncate)

`);

  fs.writeFileSync('rss-top10.md', top10.join('\\n'));
  console.log('Top 10 RSS saved to rss-top10.md');
}

fetchTop10();