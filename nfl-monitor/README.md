# NFL Super Bowl Score Monitor

Pure Node.js (no deps), polls ESPN API every 10s during Super Bowl.

## Setup

1. cd nfl-monitor
2. Edit ecosystem.config.js: set TELEGRAM_TOKEN and TELEGRAM_CHAT_ID (create Telegram bot @BotFather, get chat_id from /getUpdates)
3. PM2: `pm2 start ecosystem.config.js`
4. Tunnel: `cloudflared tunnel --url http://localhost:3000` (gets public URL)
5. Health: /health, /score endpoints.
6. Logs: `pm2 logs nfl-monitor`
7. Stop: `pm2 stop nfl-monitor`

## Test

- curl localhost:3000/health
- Game not started: waits for Super Bowl in postseason week 5.
- Simulates changes when scores update.

PM2 auto-restarts on crash/OOM.

Lessons: ESPN unofficial API stable for scores; Super Bowl = seasontype=3&week=5; state persisted; env vars for secrets.
