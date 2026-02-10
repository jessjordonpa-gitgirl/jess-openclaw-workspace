// Placeholder fetch script using rss-parser (to be cron-run)
const Parser = require('rss-parser');
const parser = new Parser();
const feeds = [
  'https://feeds.feedburner.com/CoinDesk',
  'https://cointelegraph.com/rss',
  'https://decrypt.co/feed'
];
(async () => {
  const results = [];
  for (const url of feeds){
    try{ const feed = await parser.parseURL(url); results.push({title: feed.title, items: feed.items.slice(0,3)}); }catch(e){ results.push({url, error:e.message}); }
  }
  console.log(JSON.stringify(results, null, 2));
})();
