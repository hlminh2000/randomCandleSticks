var	dataRetrievalService = require('./dataRetrievalService.js');

var retrieveData = function(){
	return new Promise(function(resolve, reject) {
		dataRetrievalService.getLatestQuote()
		.then((data)=>{
			resolve(Math.random()<0.3 ? -Math.pow(Math.random(), 2) : Math.pow(Math.random(), 2));
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
	},1000)
}
