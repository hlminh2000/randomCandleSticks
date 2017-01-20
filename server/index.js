var server = require('http').createServer()
  , url = require('url')
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ server: server })
  , express = require('express')
  , app = express()
  , port = process.env.PORT || 4080
  , socketInterface = require('./socket.js');


app.use(express.static('./public'));

app.use(function (req, res) {
  res.send({ msg: "hello" });
});

wss.on('connection', function connection(ws) {
	var location = url.parse(ws.upgradeReq.url, true);
	socketInterface.setupSocket(ws);
});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });

exports.WebSocketServer = wss;
