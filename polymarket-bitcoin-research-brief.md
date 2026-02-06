# Polymarket Bitcoin Prediction Markets - Project Brief

**Created:** 2026-02-06
**Status:** Planning Phase
**Budget:** $1,000 initial (paper trading) → $10,000+ (live trading when validated)

---

## Project Overview

Build an automated crypto prediction trading system for Polymarket's 15-minute Bitcoin price prediction markets. System will use technical indicators and multi-timeframe analysis to identify momentum shifts, trade binary "Up/Down" contracts on Bitcoin price movements, and achieve positive expected value through disciplined risk management.

**Primary Goal:** Paper trade $1,000 over 3 months to validate strategy → Scale to live trading once proven.

**Core Value Proposition:** Leverage technical indicators and multi-timeframe confluence to identify high-probability prediction market trades on Bitcoin 15-minute intervals.

---

## Objectives

### Short-Term (0-3 months)
- ✅ Build automated data pipeline from Binance (price, volume, order flow)
- ✅ Implement technical indicator calculator (MACD, ADX, RSI, volume, ATR, etc.)
- ✅ Connect to Polymarket API for real-time market odds
- ✅ Paper trade $1,000 across 50+ trades (minimum 2 trades/day)
- ✅ Track and analyze win rate, profit factor, max drawdown
- ✅ Document all findings, failures, and lessons learned

### Medium-Term (3-6 months)
- ✅ Achieve 55%+ win rate with positive expected value
- ✅ Paper trade validation → proceed to live trading at $10,000
- ✅ Implement automated trade execution with strict risk controls
- ✅ Deploy 24x7 monitoring infrastructure
- ✅ Optimize indicator parameters and time interval selections

### Long-Term (6-12 months)
- ✅ Scale capital to $50,000+ (proven edge)
- ✅ Diversify to Ethereum and other cryptocurrencies
- ✅ Monitor and adapt to market structure changes
- ✅ Develop multi-market arbitrage opportunities

---

## Trading Strategy

### Core Concept
Trade binary "Up/Down" prediction contracts on Polymarket's 15-minute Bitcoin price intervals. Execute when technical indicators show strong directional momentum with high probability (>60%) of sustained movement.

### Entry Criteria (Multi-Indicator Confluence)
1. **MACD Signal** — Bullish/bearish crossover with histogram strength
2. **ADX Trend Strength** — ADX > 25 confirms trend; ADX < 20 = range (avoid)
3. **RSI Confirmation** — RSI 30-40 (oversold bounce) or 60-70 (overbought pullback)
4. **Volume Filter** — Volume spike or divergence from price movement
5. **Multi-Timeframe Alignment** — 4H, 1H, 15M timeframes agree on direction
6. **ATR Stop Distance** — Entry valid if stop loss distance < 3x ATR

### Exit Strategy
- **Take Profit:** 1.5x-2x risk (15-25% price movement targets)
- **Stop Loss:** Fixed 10% from entry
- **Time Exit:** If not in profit within 8 intervals (2 hours), close at breakeven or small loss

### Position Sizing
- **Risk Per Trade:** Maximum 2% of portfolio ($20 paper, $200 live)
- **Total Risk:** Maximum 10% of portfolio ($100 paper, $1,000 live)
- **Leverage:** Not used (prediction markets are binary, no leverage)
- **Max Concurrent Trades:** 3-5 (diversifies timing)

---

## Technical Indicators (Recommended)

### Primary Indicators
| Indicator | Purpose | Optimal Parameters | Signals |
|-----------|---------|-------------------|---------|
| **MACD** | Trend momentum | 12, 26, 9 | Crossover + histogram |
| **ADX** | Trend strength | 14 | >25 = strong trend |
| **RSI** | Overbought/oversold | 14, 3 periods | 30-40 (bullish), 60-70 (bearish) |
| **Volume** | Volume-price confirmation | N/A | Spike + divergence |
| **ATR** | Volatility for stop-loss | 14 | Dynamic S/L distance |

### Secondary Indicators (Validation)
| Indicator | Purpose | Parameters |
|-----------|---------|------------|
| **Bollinger Bands** | Volatility envelope | 20, 2 |
| **EMA** | Trend following | 9, 21, 50 |
| **Fibonacci Retracement** | Support/resistance levels | Auto-calculated |
| **Stochastic Oscillator** | Momentum reversal | 14, 3, 3 |
| **CCI** | Price deviation | 20 |

---

## Optimal Time Intervals

### Primary Trading Interval: **15 Minutes**
- **Why:** Matches Polymarket betting windows exactly
- **Liquidity:** High volume in 15M crypto markets
- **Signal Quality:** Good balance between noise and signal
- **Price:** Prices update every 15M (no gaps)

### Secondary Intervals for Confluence Analysis
1. **4-Hour Interval** — Main trend direction and macro catalysts
2. **1-Hour Interval** — Mid-term momentum and entry timing
3. **1-Minute Interval** (optional) — Fine-tuning entries during active markets

### Session Analysis
**Best Trading Sessions** (based on liquidity and volatility):
- Asian Session (00:00-09:00 GMT) — Lower liquidity, more range-bound
- London Session (09:00-16:00 GMT) — High volume, strong moves
- New York Session (13:00-21:00 GMT) — Highest volume, most volatile

**Recommended Focus:** London + New York overlap (13:00-16:00 GMT) = best liquidity and volatility

---

## Data Sources

### Primary: Binance API
**Purpose:** Real-time price data, order book, volume, technical indicators

**Key Endpoints:**
- WebSocket streams for 15-minute candles: `btcusdt@kline_15m@trade`
- Order book: `btcusdt@depth@100ms`
- Trade history: `/api/v3/ trades?symbol=BTCUSDT&limit=100`
- Price ticker: `/api/v3/ticker/24hr?symbol=BTCUSDT`

**Data Extracted:**
- Opening price, high, low, close
- Volume
- Trade count
- Order book depth (top 50 bids/asks)
- Real-time price updates (WebSocket)

### Secondary: Polymarket API
**Purpose:** Live odds, market data, trade execution

**Key Endpoints:**
- Market list: `https://gamma-api.polymarket.com/markets`
- Bitcoin 15M specific: `https://gamma-api.polymarket.com/markets?tag=100xxx`
- Order book: `https://gamma-api.polymarket.com/orders?market_id=xxx`
- Trade execution: `POST /orders` endpoint

**Data Extracted:**
- Current "Yes" and "No" prices
- Total volume traded
- Number of contracts outstanding
- Historical odds for comparison

---

## Risk Management

### Critical Rules
1. **Never risk more than 2% per trade** ($20 paper, $200 live)
2. **Maximum 5 concurrent trades** at any time
3. **Daily loss limit: 5%** of portfolio (stop trading if hit)
4. **Weekly loss limit: 15%** (re-evaluate strategy)
5. **No emotional trading** — strict system rules only

### Position Sizing Calculation
```
Risk Amount = Portfolio Size × 0.02
Stop Loss Distance = Entry Price - Stop Price
Position Size = Risk Amount / Stop Loss Distance
Max Contract Cost = Position Size × Contract Price
```

**Example (Paper $1,000):**
- Risk: $1,000 × 2% = $20
- Stop loss: 10% = $100
- Position size: $20 / $100 = 0.2 contracts
- Contract cost: $0.50 average
- Buy: 0.2 contracts ($0.10 minimum via contract splitting)

---

## Implementation Plan

### Phase 1: Infrastructure Setup (Weeks 1-2)
- [ ] Set up GitHub repository for code
- [ ] Configure API keys (Binance, Polymarket)
- [ ] Install dependencies (Python, libraries)
- [ ] Set up logging and monitoring
- [ ] Create configuration files

### Phase 2: Data Pipeline (Weeks 3-4)
- [ ] Implement Binance WebSocket connection
- [ ] Extract 15-minute candles
- [ ] Implement technical indicator calculator
- [ ] Save data to database (PostgreSQL or SQLite)
- [ ] Build data validation and error handling

### Phase 3: Strategy Engine (Weeks 5-6)
- [ ] Implement entry signal detection
- [ ] Multi-timeframe confluence analysis
- [ ] Entry/exit logic
- [ ] Position sizing calculator
- [ ] Backtesting framework (historical data)

### Phase 4: Integration & Execution (Weeks 7-8)
- [ ] Connect to Polymarket API
- [ ] Implement trade execution (paper trading mode)
- [ ] Build dashboard for monitoring
- [ ] Create reporting and analytics

### Phase 5: Testing & Optimization (Weeks 9-12)
- [ ] Paper trade $1,000 over 50+ trades
- [ ] Analyze results (win rate, profit factor, drawdown)
- [ ] Optimize indicator parameters
- [ ] Test on different market conditions

### Phase 6: Go-Live Preparation (Weeks 13-16)
- [ ] If win rate >55% and positive EV → proceed to live trading
- [ ] Set up live execution with $10,000 capital
- [ ] Implement 24x7 monitoring infrastructure
- [ ] Create comprehensive documentation

---

## 24x7 Infrastructure Requirements

### Infrastructure Components

1. **Hosting:**
   - **Primary:** Heroku / Railway / Render (serverless, auto-scale)
   - **Backup:** AWS EC2 / DigitalOcean Droplet (dedicated instance)
   - **Runtime:** Linux (Ubuntu 22.04 LTS)
   - **Process Manager:** PM2 or systemd

2. **Database:**
   - **Primary:** PostgreSQL for structured data
   - **Backup:** SQLite for local fallback
   - **Persistence:** 90-day data retention

3. **Monitoring:**
   - **Logs:** Winston or Log4j (centralized logging)
   - **Alerts:** Telegram notifications for critical events
   - **Dashboard:** Grafana + Prometheus for metrics
   - **Health Checks:** Cron jobs every 5 minutes

4. **API Connections:**
   - **Binance:** WebSocket for real-time data (heartbeat 30s)
   - **Polymarket:** REST API for orders (rate limited)
   - **Backup:** Local caching with sync

5. **Cron Jobs:**
   - Every 15 minutes: Data fetch + signal generation
   - Every 30 minutes: Trade execution check
   - Every hour: Backup and analytics
   - Every day: Report generation, cleanup old data
   - Weekly: Strategy review, parameter optimization

6. **Skills Required (for automation):**
   - Web scraping and data fetching
   - Technical analysis (Python libraries: TA-Lib, pandas)
   - API integration (Binance, Polymarket)
   - Automated trading (Python + ccxt for derivatives)
   - Data visualization (Plotly, Dash)
   - Email/Telegram notifications
   - Database management
   - Monitoring and alerting

7. **Security:**
   - API key encryption (not stored in plain text)
   - Rate limiting on API calls
   - Error handling for API failures
   - Circuit breakers for service degradation
   - Backup and disaster recovery plan

---

## Success Metrics

### Paper Trading Metrics (Months 1-3)
- **Win Rate:** Target 55%+
- **Profit Factor:** Target >1.2
- **Maximum Drawdown:** <15%
- **Average Win/Loss:** >1.5x
- **Total Trades:** 50+ (minimum 2/day)
- **Positive Months:** 3/3 required for go-live

### Live Trading Metrics (Month 4+)
- **Win Rate:** Maintain 55%+
- **Profit Factor:** >1.5
- **Sharpe Ratio:** >1.0
- **Max Drawdown:** <20%
- **Monthly Return:** >5% (consistent)
- **Autopilot Hours:** 24/7 with <5% manual intervention

---

## Technology Stack Recommendations

### Language
- **Primary:** Python 3.11+ (versatile, excellent data libraries)
- **Backup:** Node.js/TypeScript (strong API ecosystem)

### Libraries
- **Data:** pandas, numpy, TA-Lib
- **API:** requests, websocket-client, ccxt
- **Database:** SQLAlchemy, PostgreSQL
- **Monitoring:** Prometheus, Grafana
- **Logging:** Python logging, Sentry
- **UI:** Streamlit or Dash (real-time dashboard)

### Infrastructure
- **Containerization:** Docker for easy deployment
- **Orchestration:** Docker Compose or Kubernetes
- **CI/CD:** GitHub Actions for automated testing/deployment
- **Hosting:** Railway App (simplified 24/7 hosting)

---

## Potential Pitfalls & Mitigation

### Risk 1: Market Structure Changes
- **Risk:** Polymarket adjusts fees, introduces new markets
- **Mitigation:** Continuous monitoring of market conditions; adapt parameters quarterly

### Risk 2: API Rate Limiting
- **Risk:** Binance/Polymarket block high-frequency requests
- **Mitigation:** Implement exponential backoff; use WebSockets; cache data locally

### Risk 3: False Signals
- **Risk:** Indicators produce high false positive rates
- **Mitigation:** Multi-indicator confluence; strict filters; conservative position sizing

### Risk 4: Emotion & FOMO
- **Risk:** Human intervention when losing streaks occur
- **Mitigation:** Automated trading only; strict loss limits; no manual overrides except emergencies

### Risk 5: Technical Failures
- **Risk:** Server downtime, API failures, data gaps
- **Mitigation:** Redundant hosting; local caching; automatic recovery; comprehensive logging

---

## Budget

### Initial Setup (Month 1)
- **Hosting:** $25/month (Railway/Render)
- **Database:** Free tier (PostgreSQL)
- **Tools:** Free (open-source libraries)
- **API Costs:** $0 (Binance free tier, Polymarket free tier)
- **Total:** $25/month

### Ongoing Monthly Costs (Month 2+)
- **Hosting:** $25/month
- **Database:** $0 (free tier)
- **Monitoring:** $0 (self-hosted)
- **API Costs:** $50/month (additional API calls if needed)
- **Total:** ~$75/month

### Capital Requirements
- **Phase 1 (Paper):** $1,000 (simulate with fake money)
- **Phase 2 (Live):** $10,000 (minimum viable)
- **Phase 3 (Scaled):** $50,000+ (when proven)

---

## Decision Points

### Go-Live Criteria (Must-Have)
1. ✅ 3 consecutive profitable months in paper trading
2. ✅ Win rate ≥55% with positive expected value
3. ✅ Maximum drawdown <15%
4. ✅ Technical infrastructure tested and stable
5. ✅ All API integrations verified
6. ✅ Risk management protocols in place
7. ✅ Documentation complete
8. ✅ Monitoring and alerting configured

### Hold Criteria (If Below Threshold)
- Paper trading win rate <50%
- Drawdown >20%
- Technical failures >5% of runtime
- API integration problems unresolved

---

## Next Steps

1. **Review this brief** — Validate assumptions and requirements
2. **Set up development environment** — Clone repo, install dependencies
3. **Connect API keys** — Binance API, Polymarket API
4. **Build data pipeline** — Test Binance WebSocket, extract 15-min candles
5. **Implement MACD, ADX, RSI** — Validate on historical data
6. **Start paper trading** — Execute real trades with fake money

---

## Notes

- **Dynamic fees:** Polymarket introduced dynamic fees for 15-minute markets to curb latency arbitrage — strategy must account for fee structures
- **Market consistency:** Prices typically $0.50-$0.55 for "Yes", $0.45-$0.50 for "No" before market closes
- **Liquidity:** Highest during London and New York overlap
- **Circuit breakers:** Polymarket may pause markets during extreme volatility

---

**Document Status:** 📝 Draft
**Last Updated:** 2026-02-06
**Author:** Jess (Simon's PA)
**Status:** Ready for review and iteration
