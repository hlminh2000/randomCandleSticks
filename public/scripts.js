
window.addEventListener('load', main);

function main() {
    "use strict";

    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(setupSocket);
}

function setupSocket(){
    "use strict";
	
//    var websocket = new WebSocket('ws://localhost:4080');
    var websocket = new WebSocket('ws://randomcandlestick.herokuapp.com');
	var chartData = [
		{
			period	:	0,
			opening	:	1,
			change	:	null,
			closing	:	null,
		}
	];
	// websocket.onopen = function(evt) {
	// 	console.log("connection opened!");
	// };
	// websocket.onclose = function(evt) {
	// 	console.log("connection closed!");
	// };
	// websocket.onerror = function(evt) {
	// 	console.log("error: " + evt);
	// };
	websocket.onmessage = function(evt) {
		// console.log(evt.data);
		appendChart(evt.data);
		// console.log(JSON.stringify(chartData));
	};

	function appendChart(_change){
		var currentEntry = chartData[chartData.length-1];
		currentEntry.change = parseFloat(_change);
		currentEntry.closing = currentEntry.opening * (1+currentEntry.change);
		setupNewEntry(currentEntry.closing);
		renderChart(chartData);
	}

	function setupNewEntry(_opening){
		chartData.push({
			period	:	chartData.length,
			opening	:	_opening,
			change	:	null,
			closing	:	null,
		});
	}
}

function renderChart(data){
    var chartData = data
        .filter( entry => {
            return entry.period >= data.length - 20;
        })
        .map( entry => {
            return [
                entry.period, 
                Math.min(entry.opening, entry.closing), 
                entry.opening, 
                entry.closing , 
                Math.max(entry.opening, entry.closing),
//                getMovingAverage(entry, data, 52),
            ]
        });
    
    var data = google.visualization.arrayToDataTable(chartData, true);
    

    var options = {
        legend:'none',
    };

    var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));

    chart.draw(data, options);

}

function getMovingAverage(currentEntry, dataSet, avgDuration){
    avgModel = dataSet.filter((entry) => {
        return dataSet.indexOf(entry) >= dataSet.indexOf(currentEntry)-avgDuration
            && dataSet.indexOf(entry) <= dataSet.indexOf(currentEntry);
    }).reduce((avgModel, entry) => {
        return {
            sum :   avgModel.sum+entry.closing, 
            leng:   avgModel.length+1
        };
    },{sum:0, length:0});
    return avgModel.sum / avgModel.length;
}

//	var chartData = [
//		{
//			period	:	0,
//			opening	:	1,
//			change	:	null,
//			closing	:	null,
//		}
//	];