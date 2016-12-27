var websocket = new WebSocket('ws://localhost:4080');

var chart = d3.select("#chart")
	.append("svg:svg")
	.attr("class", "chart")
	.attr("width", 900)
	.attr("height", 500);
var initialDataScale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var linearScale = d3	.scaleLinear()
							.domain([0, 9])
							.range([1, 100]);
var xAxis = d3.axisBottom(linearScale).ticks(5);
chart	.append('g')
		.attr('class', 'xAxis')
		.call(xAxis);

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
	renderChart();
}

function setupNewEntry(_opening){
	chartData.push({
		period	:	chartData.length,
		opening	:	_opening,
		change	:	null,
		closing	:	null,
	});
}

function renderChart(){
}
