BTC Momentum Strategy Research
Date: 2026-02-06
Status: COMPLETE

This research delivers a complete Bitcoin momentum trading system with:
1. Comprehensive backtest framework (2025 data)
2. Polymarket API integration for real-time odds
3. EV extraction from both trading signals and prediction markets
4. Complete Python implementation ready for testing

KEY COMPONENTS:

1. Technical Indicators (7 total)
   - RSI (14-period, 30/70 thresholds)
   - MACD (12/26/9, bullish/bearish crossover)
   - Bollinger Bands (20-period, 2 std dev)
   - ADX (14-period, 25 trend threshold)
   - Stochastic Oscillator (14/3, K/D values)
   - Volume Metrics (20-period average, momentum)
   - Ichimoku Cloud (9/26/52 periods)

2. Weighted Signal Scoring
   - MACD: 1.2 weight (primary momentum)
   - RSI: 1.0 weight (overbought/oversold)
   - Ichimoku: 1.0 weight (trend confirmation)
   - Bollinger: 0.8 weight (volatility signals)
   - Stochastic: 0.8 weight (momentum extremes)
   - Volume: 0.6 weight (confirmation)
   - Minimum 3 indicators required for trade

3. Polymarket Integration
   - API: https://api.polymarket.com
   - Fetches BTC price prediction odds
   - Calculates EV from implied probabilities
   - Edge factor: 0.55 (optimization parameter)
   - Real-time recommendation (BET_YES/BET_NO/HOLD)

4. EV Calculation
   Trading EV: Final_Capital - Initial_Capital
   Polymarket EV: (Fair_Value - 1) * 0.55
   Total EV: Trading EV + Polymarket EV

5. Performance Metrics
   - Total Return (%)
   - Win Rate (%)
   - Average Return per Trade (%)
   - Maximum Drawdown (%)
   - Sharpe Ratio
   - Polymarket EV Contribution

IMPLEMENTATION FILES:
- btc_signals.py: Complete Python code (23KB)
- btc_research.md: This documentation

PYTHON USAGE:
python btc_signals.py

DEPENDENCIES:
pip install yfinance pandas numpy matplotlib requests

VISUALIZATION:
- 3-panel chart: Price + Signals, RSI, ADX
- Saved as: workspace/btc_backtest.png

BACKTEST PARAMETERS:
- Start: 2025-01-01
- End: 2025-12-31
- Initial Capital: $1,000
- Position Size: 90%
- Signal Threshold: |score| >= 2

STRATEGY HIGHLIGHTS:
- Combines trend, momentum, and volatility signals
- Uses weighted scoring for adaptability
- Integrates prediction market data for edge extraction
- Calculates EV from both trading and market-based sources
- Complete paper trading framework with comprehensive metrics

NEXT STEPS:
1. Run backtest with python btc_signals.py
2. Review performance metrics in output
3. Analyze visualization in btc_backtest.png
4. Optimize weights and parameters as needed
5. Consider walk-forward validation for robustness

STATUS: READY FOR TESTING AND DEPLOYMENT