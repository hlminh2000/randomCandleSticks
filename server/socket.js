var	dataRetrievalService = require('./dataRetrievalService.js');
var	randgen = require('randgen');

var retrieveData = function(){
	return new Promise(function(resolve, reject) {
		dataRetrievalService.getLatestQuote()
		.then((data)=>{
			resolve(
               randgen.rnorm(0.01/30, 0.03/30)
            );
		});
	});
}


// you might use location.query.access_token to authenticate or share sessions
// or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
exports.setupSocket = function(ws){
	ws.on('message', function incoming(message) {
		console.log('received: %s', message);
	});

	setInterval(()=>{
		retrieveData()
		.then((data)=>{
			console.log(data);
			ws.send(data.toString());
		});
	}, 100)
}
