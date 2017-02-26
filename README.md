# Random Candle Sticks

A randomized candle stick charting random data from a rate of change population that resembles the statistical characteristics of the stock market's average daily return.

This is a small project to experiment with Google chart and real-time update through websocket.

A live version of this is hosted at: https://randomcandlestick.herokuapp.com/

### Features
- Data resembling American stock market daily return data.

### Technical Features
- Google Chart for charting
- Real-time update from the server through websocket

### Current Technical Limitations
- Front-end: data extraction for charting is currently done directly on the full dataset received from the server. This causes performance issue over time as the dataset grows (#deathByBigO)

### What's coming next
- Front-end: resolve performance issue by operating on a separate array for charting

### What will come one day
- Real data from yahoo's yql!!!


<!-- Alt-H1 -->
<!-- ====== -->

<!-- Alt-H2 -->
<!-- ------ -->
