var margin = {top: 15, right: 30, bottom: 20, left: 0},
	width = 575 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

var parseDate = d3.time.format("%m-%d-%Y").parse;

var x = d3.time.scale()
	.range([0, width]);

var y = d3.scale.linear()
	.range([0, height]);

var xAxis = d3.svg.axis()
	.scale(x)
	.tickFormat(d3.time.format("%y"))
	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("right")
	.tickSize(width);

var slideValue;
var marker;

d3.csv("data.csv", function(error, data) {
	data.forEach(function(d) {
		d.date = parseDate(d.date);
		d.rate = +d.rate;
		d.idnumber = +d.idnumber;
	});

var startData = data.filter(function(d) { return d.idnumber < 20140712; });

var staticDataOne = data.filter(function(d) { return d.idnumber < 20070101; });
var staticDataTwo = data.filter(function(d) { return d.idnumber < 20080804; });
var staticDataThree = data.filter(function(d) { return d.idnumber < 20081206; });
var staticDataFour = data.filter(function(d) { return d.idnumber < 20101028; });
var staticDataFive = data.filter(function(d) { return d.idnumber < 20110727; });
var staticDataSix = data.filter(function(d) { return d.idnumber < 20120524; });
var staticDataSeven = data.filter(function(d) { return d.idnumber < 20130823; });
var staticDataEight = data.filter(function(d) { return d.idnumber < 20131017; });

var animatedDataOne = data.filter(function(d) { return d.idnumber < 20080804; });
var animatedDataTwo = data.filter(function(d) { return d.idnumber > 20080802 && d.idnumber < 20081206; });
var animatedDataThree = data.filter(function(d) { return d.idnumber > 20081204 && d.idnumber < 20101028; });
var animatedDataFour = data.filter(function(d) { return d.idnumber > 20101026 && d.idnumber < 20110727; });
var animatedDataFive = data.filter(function(d) { return d.idnumber > 20110725 && d.idnumber < 20120524; });
var animatedDataSix = data.filter(function(d) { return d.idnumber > 20120522 && d.idnumber < 20130823; });
var animatedDataSeven = data.filter(function(d) { return d.idnumber > 20130821 && d.idnumber < 20131017; });
var animatedDataEight = data.filter(function(d) { return d.idnumber > 20131015 && d.idnumber < 20140712; });

var line = d3.svg.line()
	.y(function(d) { return y(d.rate); })
	.x(function(d) { return x(d.date); });

var svg = d3.select("#chart").append("svg")
	.datum(startData)
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("text")
	.attr("class", "right label")
	.text("real/$")
	.attr("x", width-11)
	.attr("y", -5);

x.domain([parseDate("1-1-2007"),parseDate("4-30-2015")]);
y.domain([d3.min(data,function (d) { return 0.95*d.rate}),d3.max(data,function (d) { return 1.05*d.rate})]);

svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);

d3.selectAll(".x.axis text")
	.attr("dx", 34);

d3.select(".x.axis text")
	.text("2007");

d3.selectAll(".x.axis").selectAll("text")
	.attr("id", function(d,i) {return "xlabel" + i});

d3.select("#xlabel8")
	.style("display", "none")
	.style("opacity", 0);

svg.append("g")
	.attr("class", "y axis")
	.call(yAxis);

var startPath = svg.append("path")
	.datum(startData)
    .style("stroke", "#00a1ce")
    .attr("d", line)
    .attr("id", "startPath");

var staticPath = svg.append("path")
	.attr("class", "static");

var animatedPath = svg.append("path")
	.attr("class", "animated");


var group = svg.selectAll(".group")
	.data(data)
	.enter().append("g")
	.attr("class", "group")
	.attr("id", function(d) { return "group" + [d.idnumber]; });

var circles = group.append("circle")
	.attr("class", "circle")
	.attr("transform", function(d) { return "translate(" + x(d.date) + "," + y(d.rate) + ")"; } )
	.attr("r", 3)
	.attr("id", function(d) { return "circle" + [d.idnumber]; });

var slides = group.append("text")
	.attr("x", function(d) { return x(d.date) + 10; })
	.attr("y", function(d) { return y(d.rate) + 5; })
	.attr("id", function(d) { return "slide" + [d.idnumber]; });

d3.select("#slide20080801").text("The run-up to")
	.attr("x", function(d) { return x(d.date) - 100; })
	.attr("y", function(d) { return y(d.rate) + 2; });
d3.select("#group20080801").append("text").text("the crisis")
	.attr("x", function(d) { return x(d.date) - 100; })
	.attr("y", function(d) { return y(d.rate) + 22; });

d3.select("#slide20081205").text("The effect of the")
	.attr("x", function(d) { return x(d.date) + 10; })
	.attr("y", function(d) { return y(d.rate) + 0; });
d3.select("#group20081205").append("text").text("financial crisis")
	.attr("x", function(d) { return x(d.date) + 10; })
	.attr("y", function(d) { return y(d.rate) + 20; });

d3.select("#slide20101027").text('The "currency war"')
	.attr("x", function(d) { return x(d.date) - 97; })
	.attr("y", function(d) { return y(d.rate) - 27; });

d3.select("#slide20110726").text("A 12-year high")
	.attr("x", function(d) { return x(d.date) + 15; })
	.attr("y", function(d) { return y(d.rate) + 5; });
d3.select("#group20110726").append("text").text("for the real")
	.attr("x", function(d) { return x(d.date) + 15; })
	.attr("y", function(d) { return y(d.rate) + 25; });

d3.select("#slide20120523").text("A period of")
	.attr("x", function(d) { return x(d.date) - 85; })
	.attr("y", function(d) { return y(d.rate) + 5; });
d3.select("#group20120523").append("text").text("depreciation")
	.attr("x", function(d) { return x(d.date) - 85; })
	.attr("y", function(d) { return y(d.rate) + 25; });

d3.select("#slide20130822").text("The dawn of tapering")
	.attr("x", function(d) { return x(d.date) - 65; })
	.attr("y", function(d) { return y(d.rate) + 25; });

d3.select("#slide20131016").text("A different")
	.attr("x", function(d) { return x(d.date) - 20; })
	.attr("y", function(d) { return y(d.rate) - 35; });
d3.select("#group20131016").append("text").text("currency war")
	.attr("x", function(d) { return x(d.date) - 20; })
	.attr("y", function(d) { return y(d.rate) - 15; });

d3.select("#slide20140711").text("Gyrations")
	.attr("x", function(d) { return x(d.date) - 10; })
	.attr("y", function(d) { return y(d.rate) + 35; });
d3.select("#group20140711").append("text").text("continue")
	.attr("x", function(d) { return x(d.date) - 10; })
	.attr("y", function(d) { return y(d.rate) + 55; });


d3.selectAll(".group text")
	.style("opacity", 0);

function highlight(marker) {
	d3.select(marker)
		.style("opacity", 1)
		.transition()
		.duration(250)
		.attr("r", 5.5)
		.style("stroke-width",4.5)
		.transition()
		.duration(250)
		.attr("r", 4)
		.style("stroke-width",3);
}

d3.select("#next").on("click", function(){
	slideValue = d3.select("#next").attr("value");

	if (slideValue=="start") {
		d3.select("#startPath")
			.transition()
			.duration(500)
			.style("opacity", 0);

		d3.select(".static")
			.style("opacity", 1);

		d3.select(".animated")
			.style("opacity", 1);

		d3.selectAll(".group text")
			.style("opacity", 0);

		d3.selectAll(".group circle")
			.style("opacity", 0);

		d3.selectAll("#slides div")
			.transition()
			.duration(500)
			.style("opacity", 0);

		document.getElementById("next").setAttribute("value", "one");
		document.getElementById("back").setAttribute("value", "one");
		staticPath.datum(staticDataOne)
			.attr("d", line);
		animatedPath.datum(animatedDataOne)
			.attr("d", line)
			.call(transition);

	} else if (slideValue=="one") {
		d3.selectAll("#group20080801 text")
			.transition()
			.duration(500)
			.style("opacity", 0.5);

		d3.selectAll("#slides div")
			.transition()
			.duration(500)
			.style("opacity", 0);

		document.getElementById("next").setAttribute("value", "two");
		document.getElementById("back").setAttribute("value", "two");
		staticPath.datum(staticDataTwo)
			.attr("d", line);
		animatedPath.datum(animatedDataTwo)
			.attr("d", line)
			.call(transition);

	} else if (slideValue=="two") {
		d3.selectAll("#group20081205 text")
			.transition()
			.duration(500)
			.style("opacity", 0.5);

		d3.selectAll("#slides div")
			.transition()
			.duration(500)
			.style("opacity", 0);

		document.getElementById("next").setAttribute("value", "three");
		document.getElementById("back").setAttribute("value", "three");
		staticPath.datum(staticDataThree)
			.attr("d", line);
		animatedPath.datum(animatedDataThree)
			.attr("d", line)
			.call(transition);

	} else if (slideValue=="three") {
		d3.selectAll("#group20101027 text")
			.transition()
			.duration(500)
			.style("opacity", 0.5);

		d3.selectAll("#slides div")
			.transition()
			.duration(500)
			.style("opacity", 0);

		document.getElementById("next").setAttribute("value", "four");
		document.getElementById("back").setAttribute("value", "four");
		staticPath.datum(staticDataFour)
			.attr("d", line);
		animatedPath.datum(animatedDataFour)
			.attr("d", line)
			.call(transition);

	} else if (slideValue=="four") {
		d3.selectAll("#group20110726 text")
			.transition()
			.duration(500)
			.style("opacity", 0.5);

		d3.selectAll("#slides div")
			.transition()
			.duration(500)
			.style("opacity", 0);

		document.getElementById("next").setAttribute("value", "five");
		document.getElementById("back").setAttribute("value", "five");
		staticPath.datum(staticDataFive)
			.attr("d", line);
		animatedPath.datum(animatedDataFive)
			.attr("d", line)
			.call(transition);

	} else if (slideValue=="five") {
		d3.selectAll("#group20120523 text")
			.transition()
			.duration(500)
			.style("opacity", 0.5);

		d3.selectAll("#slides div")
			.transition()
			.duration(500)
			.style("opacity", 0);

		document.getElementById("next").setAttribute("value", "six");
		document.getElementById("back").setAttribute("value", "six");
		staticPath.datum(staticDataSix)
			.attr("d", line);
		animatedPath.datum(animatedDataSix)
			.attr("d", line)
			.call(transition);

	} else if (slideValue=="six") {
		d3.selectAll("#group20130822 text")
			.transition()
			.duration(500)
			.style("opacity", 0.5);

		d3.selectAll("#slides div")
			.transition()
			.duration(500)
			.style("opacity", 0);

		document.getElementById("next").setAttribute("value", "seven");
		document.getElementById("back").setAttribute("value", "seven");
		staticPath.datum(staticDataSeven)
			.attr("d", line);
		animatedPath.datum(animatedDataSeven)
			.attr("d", line)
			.call(transition);
	} else if (slideValue=="seven") {
		d3.selectAll("#group20131016 text")
			.transition()
			.duration(500)
			.style("opacity", 0.5);

		d3.selectAll("#slides div")
			.transition()
			.duration(500)
			.style("opacity", 0);

		document.getElementById("next").setAttribute("value", "end");
		document.getElementById("back").setAttribute("value", "end");
		staticPath.datum(staticDataEight)
			.attr("d", line);
		animatedPath.datum(animatedDataEight)
			.attr("d", line)
			.call(transition);
	} else if (slideValue=="end") {

		d3.select(".static")
			.style("opacity", 0);

		d3.select("#startPath")
			.style("opacity", 1);

		d3.select(".animated")
			.transition()
			.duration(500)
			.style("opacity", 0);

		d3.selectAll(".group text")
			.transition()
			.duration(500)
			.style("opacity", 0);

		d3.selectAll(".group circle")
			.transition()
			.duration(500)
			.style("opacity", 0);

		d3.selectAll("#slides div")
			.transition()
			.duration(500)
			.style("opacity", 0)
			.transition()
			.delay(500)
			.duration(750)
			.style("opacity", 1);

		d3.selectAll(".slideeight")
			.transition()
			.delay(500)
			.style("display", "none");

		d3.selectAll(".slideintro")
			.transition()
			.delay(500)
			.duration(750)
			.style("display", "block")
			.style("opacity", 1);

		document.getElementById("next").setAttribute("value", "start");
		document.getElementById("back").setAttribute("value", "start");

		setTimeout(function() {
			d3.select("#buttons #next")
				.html("Start<span class='fa fa-caret-right'></span>");
			d3.select("#buttons #back")
				.style("display", "none");
		}, 500);

	}
});

d3.select("#back").on("click", function(){
	slideValue = d3.select("#back").attr("value");

	if (slideValue=="one") {
		d3.selectAll("#group20080801 text")
			.style("opacity", 0);

		d3.select("#circle20080801")
			.style("opacity", 0);

		d3.select(".static")
			.transition()
			.duration(500)
			.style("opacity", 0);

		d3.select(".animated")
			.transition()
			.duration(500)
			.style("opacity", 0);

		d3.select("#startPath")
			.transition()
			.delay(500)
			.duration(500)
			.style("opacity", 1);

		d3.select("#buttons #back")
			.style("display", "none");

		document.getElementById("next").setAttribute("value", "start");
		document.getElementById("back").setAttribute("value", "start");

		d3.selectAll(".slideone")
			.style("display", "none");

		d3.selectAll(".slideintro")
			.style("display", "block")
			.style("opacity", 1);

	} else if (slideValue=="two") {
		d3.selectAll("#group20081205 text")
			.style("opacity", 0);

		d3.select("#circle20081205")
			.style("opacity", 0);

		d3.selectAll("#group20080801 text")
			.transition()
			.duration(750)
			.style("opacity", 1);

		marker = "#circle20080801";
		highlight(marker);

		document.getElementById("next").setAttribute("value", "one");
		document.getElementById("back").setAttribute("value", "one");
		staticPath.datum(staticDataTwo)
			.attr("d", line);
		animatedPath.datum(staticDataOne)
			.attr("d", line);

		d3.selectAll(".slidetwo")
			.style("display", "none");

		d3.selectAll(".slideone")
			.style("display", "block")
			.style("opacity", 1);

	} else if (slideValue=="three") {
		d3.selectAll("#group20101027 text")
			.style("opacity", 0);

		d3.select("#circle20101027")
			.style("opacity", 0);

		d3.selectAll("#group20081205 text")
			.transition()
			.duration(750)
			.style("opacity", 1);

		marker = "#circle20081205";
		highlight(marker);

		document.getElementById("next").setAttribute("value", "two");
		document.getElementById("back").setAttribute("value", "two");
		staticPath.datum(staticDataThree)
			.attr("d", line);
		animatedPath.datum(staticDataOne)
			.attr("d", line);

		d3.selectAll(".slidethree")
			.style("display", "none");

		d3.selectAll(".slidetwo")
			.style("display", "block")
			.style("opacity", 1);

	} else if (slideValue=="four") {
		d3.selectAll("#group20110726 text")
			.style("opacity", 0);

		d3.select("#circle20110726")
			.style("opacity", 0);

		d3.selectAll("#group20101027 text")
			.transition()
			.duration(750)
			.style("opacity", 1);

		marker = "#circle20101027";
		highlight(marker);

		document.getElementById("next").setAttribute("value", "three");
		document.getElementById("back").setAttribute("value", "three");
		staticPath.datum(staticDataFour)
			.attr("d", line);
		animatedPath.datum(staticDataOne)
			.attr("d", line);

		d3.selectAll(".slidefour")
			.style("display", "none");

		d3.selectAll(".slidethree")
			.style("display", "block")
			.style("opacity", 1);
	} else if (slideValue=="five") {
		d3.selectAll("#group20120523 text")
			.style("opacity", 0);

		d3.select("#circle20120523")
			.style("opacity", 0);

		d3.selectAll("#group20110726 text")
			.transition()
			.duration(750)
			.style("opacity", 1);

		marker = "#circle20110726";
		highlight(marker);

		document.getElementById("next").setAttribute("value", "four");
		document.getElementById("back").setAttribute("value", "four");
		staticPath.datum(staticDataFive)
			.attr("d", line);
		animatedPath.datum(staticDataOne)
			.attr("d", line);

		d3.selectAll(".slidefive")
			.style("display", "none");

		d3.selectAll(".slidefour")
			.style("display", "block")
			.style("opacity", 1);
	} else if (slideValue=="six") {
		d3.selectAll("#group20130822 text")
			.style("opacity", 0);

		d3.select("#circle20130822")
			.style("opacity", 0);

		d3.selectAll("#group20120523 text")
			.transition()
			.duration(750)
			.style("opacity", 1);

		marker = "#circle20120523";
		highlight(marker);

		document.getElementById("next").setAttribute("value", "five");
		document.getElementById("back").setAttribute("value", "five");
		staticPath.datum(staticDataSix)
			.attr("d", line);
		animatedPath.datum(staticDataOne)
			.attr("d", line);

		d3.selectAll(".slidesix")
			.style("display", "none");

		d3.selectAll(".slidefive")
			.style("display", "block")
			.style("opacity", 1);
	} else if (slideValue=="seven") {
		d3.selectAll("#group20131016 text")
			.style("opacity", 0);

		d3.select("#circle20131016")
			.style("opacity", 0);

		d3.selectAll("#group20130822 text")
			.transition()
			.duration(750)
			.style("opacity", 1);

		marker = "#circle20130822";
		highlight(marker);

		document.getElementById("next").setAttribute("value", "six");
		document.getElementById("back").setAttribute("value", "six");
		staticPath.datum(staticDataSeven)
			.attr("d", line);
		animatedPath.datum(staticDataOne)
			.attr("d", line);

		d3.selectAll(".slideseven")
			.style("display", "none");

		d3.selectAll(".slidesix")
			.style("display", "block")
			.style("opacity", 1);
	} else if (slideValue=="end") {
		d3.select("#buttons #next").text("Next");
		d3.selectAll("#group20140711 text")
			.style("opacity", 0);

		d3.select("#circle20140711")
			.style("opacity", 0);

		d3.selectAll("#group20131016 text")
			.transition()
			.duration(750)
			.style("opacity", 1);

		marker = "#circle20131016";
		highlight(marker);

		document.getElementById("next").setAttribute("value", "seven");
		document.getElementById("back").setAttribute("value", "seven");
		staticPath.datum(staticDataEight)
			.attr("d", line);
		animatedPath.datum(staticDataOne)
			.attr("d", line);

		d3.selectAll(".slideeight")
			.style("display", "none");

		d3.selectAll(".slideseven")
			.style("display", "block")
			.style("opacity", 1);
	}
});

function animateLine() {
	var l = this.getTotalLength();
	i = d3.interpolateString("0," + l, l + "," + l);
	return function(t) { return i(t); };
}

function transition() {
	d3.select(".animated")
		.transition()
		.duration(2500)
		.ease("cubic-in-out")
		.attrTween("stroke-dasharray", animateLine)
		.each("end", function() {

			if (slideValue=="start") {
				d3.select("#buttons #next").html("Next<span class='fa fa-caret-right'></span>");
				d3.select("#buttons #back").style("display", "inline-block");
				marker = "#circle20080801";
				highlight(marker);
				d3.selectAll("#group20080801 text")
					.transition()
					.duration(750)
					.style("opacity", 1);

				d3.selectAll(".slideintro")
					.style("display", "none");

				d3.selectAll("#slides div")
					.transition()
					.duration(750)
					.style("opacity", 1);

				d3.selectAll(".slideone")
					.transition()
					.duration(750)
					.style("display", "block")
					.style("opacity", 1);

			} else if (slideValue=="one") {
				marker = "#circle20081205";
				highlight(marker);
				d3.selectAll("#group20081205 text")
					.transition()
					.duration(750)
					.style("opacity", 1);

				d3.selectAll(".slideone")
					.style("display", "none");

				d3.selectAll("#slides div")
					.transition()
					.duration(750)
					.style("opacity", 1);

				d3.selectAll(".slidetwo")
					.transition()
					.duration(750)
					.style("display", "block")
					.style("opacity", 1);

			} else if (slideValue=="two") {
				marker = "#circle20101027";
				highlight(marker);
				d3.selectAll("#group20101027 text")
					.transition()
					.duration(750)
					.style("opacity", 1);
				d3.selectAll(".slidetwo")
					.style("display", "none");

				d3.selectAll("#slides div")
					.transition()
					.duration(750)
					.style("opacity", 1);

				d3.selectAll(".slidethree")
					.transition()
					.duration(750)
					.style("display", "block")
					.style("opacity", 1);

			} else if (slideValue=="three") {
				marker = "#circle20110726";
				highlight(marker);
				d3.selectAll("#group20110726 text")
					.transition()
					.duration(750)
					.style("opacity", 1);
				d3.selectAll(".slidethree")
					.style("display", "none");

				d3.selectAll("#slides div")
					.transition()
					.duration(750)
					.style("opacity", 1);

				d3.selectAll(".slidefour")
					.transition()
					.duration(750)
					.style("display", "block")
					.style("opacity", 1);
			} else if (slideValue=="four") {
				marker = "#circle20120523";
				highlight(marker);
				d3.selectAll("#group20120523 text")
					.transition()
					.duration(750)
					.style("opacity", 1);
				d3.selectAll(".slidefour")
					.style("display", "none");

				d3.selectAll("#slides div")
					.transition()
					.duration(750)
					.style("opacity", 1);

				d3.selectAll(".slidefive")
					.transition()
					.duration(750)
					.style("display", "block")
					.style("opacity", 1);
			} else if (slideValue=="five") {
				marker = "#circle20130822";
				highlight(marker);
				d3.selectAll("#group20130822 text")
					.transition()
					.duration(750)
					.style("opacity", 1);
				d3.selectAll(".slidefive")
					.style("display", "none");

				d3.selectAll("#slides div")
					.transition()
					.duration(750)
					.style("opacity", 1);

				d3.selectAll(".slidesix")
					.transition()
					.duration(750)
					.style("display", "block")
					.style("opacity", 1);
			} else if (slideValue=="six") {
				marker = "#circle20131016";
				highlight(marker);
				d3.selectAll("#group20131016 text")
					.transition()
					.duration(750)
					.style("opacity", 1);
				d3.selectAll(".slidesix")
					.style("display", "none");
				d3.selectAll("#slides div")
					.transition()
					.duration(750)
					.style("opacity", 1);

				d3.selectAll(".slideseven")
					.transition()
					.duration(750)
					.style("display", "block")
					.style("opacity", 1);
			} else if (slideValue=="seven") {
				marker = "#circle20140711";
				highlight(marker);
				d3.select("#buttons #next").html("Again<span class='fa fa-repeat'></span>");
				d3.selectAll("#group20140711 text")
					.transition()
					.duration(750)
					.style("opacity", 1);
				d3.selectAll(".slideseven")
					.style("display", "none");
				d3.selectAll("#slides div")
					.transition()
					.duration(750)
					.style("opacity", 1);

				d3.selectAll(".slideeight")
					.transition()
					.duration(750)
					.style("display", "block")
					.style("opacity", 1);
			}
		});
		d3.timer.flush();
}

d3.select("#slides")
	.style("display","inline");

});

d3.select(self.frameElement).style("height", "770px");