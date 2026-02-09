const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 3000;
const POLL_URL = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=3&amp;week=5';
const STATE_FILE = path.join(__dirname, 'last_score.json');
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

let previousScore = null;
let lastPollTime = null;

async function loadState() {
  try {
    const data = await fs.readFile(STATE_FILE, 'utf8');
    const state = JSON.parse(data);
    previousScore = state.score;
    lastPollTime = state.time;
    console.log('Loaded state:', previousScore);
  } catch (e) {
    console.log('No previous state, starting fresh');
  }
}

async function saveState(score, time) {
  try {
    await fs.writeFile(STATE_FILE, JSON.stringify({score, time}, null, 2));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

async function fetchScore() {
  try {
    const response = await fetch(POLL_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const events = data.leagues?.[0]?.events || [];
    const game = events.find(e => e.name.toLowerCase().includes('super bowl') || events.length === 1);
    if (!game) return null;

    const comp = game.competitions[0];
    const competitors = comp.competitors;
    const home = competitors.find(c => c.homeAway === 'home');
    const away = competitors.find(c => c.homeAway === 'away');
    const scoreHome = parseInt(home.score?.value || 0);
    const scoreAway = parseInt(away.score?.value || 0);
    const status = game.status.type.state; // 1=inprogress, 2=final etc
    const abbrHome = home.team.abbreviation;
    const abbrAway = away.team.abbreviation;
    const currentScore = `${abbrAway} ${scoreAway} - ${scoreHome} ${abbrHome} (${status})`;
    return { currentScore, scoreAway, scoreHome, status };
  } catch (e) {
    console.error('Poll error:', e.message);
    return null;
  }
}

async function sendTelegram(msg) {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('No Telegram config, skipping alert');
    return;
  }
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    const body = new URLSearchParams({chat_id: TELEGRAM_CHAT_ID, text: msg});
    const res = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body
    });
    if (!res.ok) throw new Error(`Telegram ${res.status}`);
    console.log('Alert sent');
  } catch (e) {
    console.error('Telegram error:', e.message);
  }
}

async function poll() {
  const now = Date.now();
  const scoreData = await fetchScore();
  if (!scoreData) return;

  const { currentScore, status } = scoreData;
  console.log(`Poll ${new Date().toISOString()}: ${currentScore}`);

  if (previousScore && previousScore !== currentScore) {
    const alertMsg = `⚽ Super Bowl Score Change! ${previousScore} → ${currentScore}`;
    await sendTelegram(alertMsg);
    console.log('CHANGE DETECTED:', alertMsg);
  }

  previousScore = currentScore;
  lastPollTime = now;
  await saveState(currentScore, now);
}

// Server
const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.url === '/health') {
    res.statusCode = 200;
    res.end(JSON.stringify({
      status: 'ok',
      lastScore: previousScore,
      lastPoll: new Date(lastPollTime || 0).toISOString(),
      uptime: process.uptime()
    }));
  } else if (req.url === '/score') {
    const scoreData = await fetchScore();
    res.end(JSON.stringify(scoreData || {error: 'No game'}));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({error: 'Not found'}));
  }
});

server.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
  console.log('Set TELEGRAM_TOKEN and TELEGRAM_CHAT_ID env vars for alerts');
});

// Init
loadState().then(() => {
  poll(); // initial
  setInterval(poll, 10000); // every 10s
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await saveState(previousScore, Date.now());
  server.close(() => process.exit(0));
});

// No crashes
process.on('uncaughtException', (err) => {
  console.error('Uncaught:', err);
  // continue
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  // continue
});
