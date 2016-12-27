var 	fs = require('fs'),
		XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var query = function(queryStr){
	return getHttpResponse({
		site: "https://query.yahooapis.com//v1/public/yql?q=",
		query: queryStr,
		param: "&format=json&env=http://datatables.org/alltables.env"
	});
}

var getHttpResponse = function(query){
	var promise = new Promise(function(resolve, reject){
		var xhr = new XMLHttpRequest();
		var url = [query.site, query.query, query.param].join('');
		xhr.open('GET', url);
		xhr.onreadystatechange = () => {
			console.log(xhr.status);
			if(xhr.readyState === 4){
				resolve(xhr.responseText);
			}
		};
		xhr.send();
	});
	return promise;
}

exports.query = query;
