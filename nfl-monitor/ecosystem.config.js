module.exports = {
  apps: [{
    name: 'nfl-monitor',
    script: 'index.js',
    env: {
      NODE_ENV: 'production',
      TELEGRAM_TOKEN: 'YOUR_BOT_TOKEN_HERE',
      TELEGRAM_CHAT_ID: 'YOUR_CHAT_ID_HERE'
    },
    watch: false,
    max_memory_restart: '500M',
    // Health via HTTP probe in PM2 monit
  }]
};
