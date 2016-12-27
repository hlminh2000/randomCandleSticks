var yqlService = require('./yql/yqlService.js');

exports.getLatestQuote = function(){
	return new Promise(function(resolve, reject) {
		resolve(true);
		yqlService.query("SELECT * FROM yahoo.finance.xchange WHERE symbol='USDCAD")
		.then((data) => {
			resolve(data);
		});
	});
}
