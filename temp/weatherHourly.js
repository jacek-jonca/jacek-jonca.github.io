"use strict";

// variables to set
var title = "Normal Daily Temperature in San Francisco by hour of day, based on last 30 years";

// STANDARD VARIABLES
var margin = {top:    100, 
              right:  250, 
              bottom: 60, 
              left:   100},
  width = 1200 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// Variables for this viz
var selectedHours = [];
var selectedVar = {legendWidth: {base: 50, selected: 60},
                   legendOpacity: {base: .7, selected: 1}}
var legendRectHeight = 13;

// SCALE FUNCTIONS
var scales = {x: d3.scale.linear().domain([0,365]).range([0,width]),
              y: d3.scale.linear().domain([32,75]).range([height,0]),
              color: d3.scale.linear().domain([0,6,12,18,23]).range(["#0A4D94", "#87B5E6", "#FFC639", "#9F8DE9", "#2C109D"]),
              xTime: d3.time.scale().domain([moment("2010-01-01"), moment("2010-12-31")]).range([0, width]), 
              legendY: d3.scale.linear().domain([0,23]).range([height/2+ legendRectHeight * 12 + 30, height/2 - legendRectHeight * 12 + 30])};

// STANDARD SVG SETUP
var svg = d3.select('#weatherLines')
      .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var legend = svg.append("g").attr("class", "legend");

var clock = svg.append("g").attr("class", "clock");

// instructions
d3.select('#instructions')
      .style('left', (margin.left + 5) + "px")
      .style('width', width + "px");

// voronoi set up
var voronoi = d3.geom.voronoi()
    .x(function(d) {return scales.xTime(moment(d.day)); })
    .y(function(d) {return scales.y(d.HLYTEMPNORMAL / 10); })
    .clipExtent([[0, 0], [width, height]]);

// add dot for selection
var focus = svg.append("g")
      .attr("transform", "translate(-100,-100)")
      .attr("class", "focus");

focus.append("circle")
     .attr("r", 2)
     .attr("class", "hidden");

// place tooltip
d3.select('#tooltip')
  .style('left', (margin.left + 30) + "px")
  .style('top', (margin.top + 30) + "px");

// read in data file & draw graph
d3.csv("normalWeatherSF.csv", function(error, data) {
  if (error) return console.error(error);

  // transform data to useable format (better way to do this?)
  var sf = transformData(data, 'san francisco');

  // draw lines 
  drawGraph(sf.normalTemp, title, data); 

});

// create array of arrays for path structure
function transformData(inputData, location){
  var outputData = {}
  outputData.city = location;
  outputData.normalTemp = [];
  for(var i = 0; i < 24; i++){
    outputData.normalTemp[i] = [];
  };
  inputData.forEach(function(d){
    outputData.normalTemp[+d.hour][moment(d.day).dayOfYear() - 1] = d.HLYTEMPNORMAL / 10;
  });

  return outputData
}

// draw various elements of the graph
function drawGraph(data, title, origData){
  drawLines(data);
  drawLegend(data);
  drawAxis();
  drawTitle(title);
  drawVoronoi(origData);
}

// draw the lines for the graph itself
function drawLines(data) {
  // line graph
  svg.selectAll('path')
    .data(data)
    .enter()
    .append('path')
      .attr("d", function(d){return lineFunction(d)})
      .attr("stroke", function(d,i){return scales.color(i);})
      .attr("class", "hourlyLines");
}

// draw color legend to the right
function drawLegend(data) {
  // colored rectangles for legend
  legend.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
      .attr('class', 'legend')
      .attr("x", width + margin.right / 2 - 25)
      .attr("y", function(d, i){return scales.legendY(i)})
      .attr("height", legendRectHeight + 1)
      .attr("width", 50)
      .attr("fill", function(d,i){return scales.color(i)})
      .attr("opacity", .7)
      .on('click', function(d,i){
        updateSelectedList(i);
        updateSelectedView();
      });

  // text labels for hours in legend, show only midnight, 6am, noon, and 6pm
  legend.selectAll('text')
    .data(data)
      .enter()
      .append('text')
        .attr('x', width + margin.right / 2 + 40)
        .attr('y', function(d, i){return scales.legendY(i) + legendRectHeight})
        .on('click', function(d,i){
          updateSelectedList(i);
          updateSelectedView();
        })
        .text(function(d, i){if([0,6,12,18].indexOf(i) != -1){return formatHours(i);}});

  drawClock();
}

function drawAxis(){
  var xAxis = d3.svg.axis()
      .tickFormat(d3.time.format("%b"))
      .scale(scales.xTime)
      .orient('bottom');

  var yAxis = d3.svg.axis()
      .scale(scales.y)
      .orient('left');

  svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

  svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
        .attr('class', 'label')
        .attr('x', 10)
        .attr('y', -40)
        .attr("transform", "rotate(-90)")
        .text('Normal Temperature (F)');

  svg.call(adjustTextLabels);
}

// translate x labels to be centered
function adjustTextLabels(selection) {
    selection
      .selectAll('.x')
      .selectAll('text')
        .attr('transform', 'translate(' + width/24 + ',0)');
}

// draw hidden voronoi to manage mouseovers, clicks, and selections
function drawVoronoi(data) {
  svg.append("g")
      .attr("class", "voronoi")
      .selectAll("path")
        .data(voronoi(data).filter(function(n){ return n != undefined }))
          .enter()
          .append("path")
            .attr("d", function(d) { return "M" + d.join("L") + "Z"; })
            .datum(function(d) { return d.point; })
            .on("mouseover", vMouseover)
            .on("mouseout", vMouseout)
            .on('click', function(d,i){
              updateSelectedList(+d.hour);
              updateSelectedView();
            });
}

// add the main title
function drawTitle(title){
    // title
  svg.append("text")
    .text(title)
    .attr("x", width / 2)
    .attr("y", -20)
    .style('text-anchor', 'middle')
    .attr("class","title");
}

var clockPosition = {x:  width - 60, y: 60};

// draw clock
function drawClock(){
  var hour = 0; 
  var rotate = 360 / 12 * hour;
  clock.append("circle")
       .attr("stroke", "grey")
       .attr("stroke-width", 2)
       .attr("fill", "none")
       .attr("r", 50)
       .attr("cx", clockPosition.x)
       .attr("cy", clockPosition.y)

  clock.append("circle")
       .attr("stroke", "none")
       .attr("fill", "grey")
       .attr("r", 2)
       .attr("cx", clockPosition.x)
       .attr("cy", clockPosition.y)

  clock.append("line")
       .attr("stroke", "grey")
       .attr("stroke-width", 2)
       .attr("x1", clockPosition.x)
       .attr("x2", clockPosition.x)
       .attr("y1", clockPosition.y)
       .attr("y2", clockPosition.y - 30)
       .attr("transform", "rotate(" + rotate + " ," + clockPosition.x + "," + clockPosition.y + ")");

  clock.append('text').attr("class", "am partOfDay")
       .attr("fill", "grey")
       .attr("x", clockPosition.x- 50 - 13.5)
       .attr("y", clockPosition.y - 45)
       .text("AM")
       
  clock.append('text').attr("class", "pm partOfDay")
       .attr("fill", "grey")
       .attr("x", clockPosition.x + 50 - 13.5)
       .attr("y", clockPosition.y - 45)
       .text("PM")

  d3.select(".clock").selectAll(".clockHour").data([12,1,2,3,4,5,6,7,8,9,10,11]).enter().append('text')
       .attr("class", "clockHour")
    //   .attr("fill", function(d){if(hour == d){return "white"} else {return "grey"}})
       .attr("fill", "grey")
       .attr("font-size", 14)
       .attr("x", function(d){if([10,11,12].indexOf(d) == -1){return clockPosition.x - 3.5} else {return clockPosition.x - 3.5 - 4}})
       .attr("y", clockPosition.y + 5)
       .attr("transform", function(d){var rotateN = 360 / 12 * d; 
          return "translate("+ (39 * Math.cos((rotateN - 90) *Math.PI/180)) + "," + (39 * Math.sin((rotateN - 90)*Math.PI/180)) + ")"})
       .text(function(d){return d});

}

function activateClock(hour){
  var partOfDay = 'am'
  if(hour > 11){
    hour = hour - 12;
    partOfDay = 'pm';
  }
  // AM vs PM
  d3.select("." + partOfDay).attr("fill", "white");

  // line
  var rotate = 360 / 12 * hour;
  d3.select(".clock").select("line").attr("transform", "rotate(" + rotate + " ," + clockPosition.x + "," + clockPosition.y + ")").attr("stroke", "white");

  // time in text
  d3.selectAll(".clockHour").data([12,1,2,3,4,5,6,7,8,9,10,11])
    .attr("fill", function(d){if(hour == d){return "white"} else {return "grey"}});
}

function resetClock(){
  d3.select(".clock").selectAll("text").attr("fill", "grey");
  d3.select(".clock").selectAll("line").attr("stroke", "grey")
}

// define function to translate points into line
var lineFunction = d3.svg.line()
  .x(function(d,i) {
    return scales.x(i);
  })
  .y(function(d) {
    return scales.y(d);
  })
  .interpolate('basis');

// helper function for formatting hours into normal readable
function formatHours(num){
  if (num == 0){
    return "midnight";
  } else if (num < 12){
    return num + "am";
  } else if (num == 12){
    return "noon";
  } else {
    return (num - 12) + "pm";
  }
}

// -------------------
// managing selections 
// -------------------
function updateSelectedList(i){
  if(selectedHours.indexOf(i) == -1){
      selectedHours.push(i);
  } else {
      selectedHours.splice(selectedHours.indexOf(i), 1);
  }
}

function updateSelectedView(){
  // check if selected line is already selected or not
   if(selectedHours.length == 0){
    d3.selectAll(".hourlyLines").attr("opacity", 1).classed("selected", false);
    d3.selectAll(".legend rect").attr("opacity", .7).attr("width", 50);
    d3.selectAll(".legend text").text(function(d, i){if([0,6,12,18].indexOf(i) != -1){return formatHours(i);}});
  } else {
    d3.selectAll(".hourlyLines")
      .attr("opacity", function(d,i){if(selectedHours.indexOf(i) != -1){return 1} else {return .4}})
      .classed('selected', function(d,i){if(selectedHours.indexOf(i) != -1){return true} else {return false}});


    d3.selectAll(".legend rect")
      .attr("opacity", function(d,i){if(selectedHours.indexOf(i) != -1){return 1} else {return .7}})
      .attr("width", function(d,i){if(selectedHours.indexOf(i) != -1){return 60} else {return 50}});

    d3.selectAll(".legend text")
      .text(function(d,i){if(selectedHours.indexOf(i) != -1){return formatHours(i);}else {return ""}})

    resetClock();
  }
}

// -------------------------------
// mouseovers called from voronoi
// -------------------------------
function vMouseover(d) {
    var xpos = scales.xTime(moment(d.day));
    var ypos = scales.y(d.HLYTEMPNORMAL / 10)
    focus.select('circle').classed('hidden', false);
    focus.attr("transform", "translate(" + (xpos - 2) + "," + (ypos) + ")");
    var text = d.HLYTEMPNORMAL / 10 + "°F on " + moment(d.day).format("MMM DD") + " at " + formatHours(d.hour);

    d3.select('#tooltip')
      .classed('hidden', false)
      .style('left', (margin.left + xpos + 10) + "px")
      .style('top', (margin.top + ypos - 10) + "px")
      .select('#values')
      .text(text);

    activateClock(d.hour);
}

function vMouseout(d) {
    d3.select('#tooltip').classed('hidden', true);
    focus.select('circle').classed('hidden', true);

    resetClock();
}