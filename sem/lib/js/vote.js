    var voteA = "A";
    var voteB = "B";
    var voteC = "C";
    var voteD = "D";
    var voteE = "E";
    var countA = 0; //to count the number of match
    var countB = 0; //to count the number of match
    var countC = 0; //to count the number of match
    var countD = 0; //to count the number of match
    var countE = 0; //to count the number of match
    var unrecognized = 0; //to count the number of match

// create initial empty chart
var ctx_live = document.getElementById("mycanvas");
var myChart = new Chart(ctx_live, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      data: [],
       "label":"Skills",
       "backgroundColor":"rgba(0,170,255,.8)",
    }]
  },
  options: {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          suggestedMax: 10,
          fontSize: 20
        },
        gridLines: {
          display: true
        },
        pointLabels: {
           fontSize: 20
        },
        scaleLabel: {
          "display":true,
          "labelString":"Number of Votes",
          "fontColor": "#000",
          "fontSize": "25"
       }
      }],
      xAxes: [{
        ticks: {
          fontSize: 20
        },
        barThickness: 120,
        gridLines: {
          display: false
        }
      }]      
    }
  }
});

var pubnub = new PubNub({
	publish_key: 'pub-c-29c5c1c2-fdcb-45ce-9da3-74930f562e0f',
	subscribe_key: 'sub-c-59dee8f8-15e5-11e9-b43f-7a31102fe3bb',
});

// Subscribe to the demo_tutorial channel
pubnub.addListener({
    message: function(message) {
		var letter = JSON.parse(JSON.stringify(message));
		var letter = letter.message;
console.log(letter);

    if(letter == voteA){
      countA++;
  // add new label and data point to chart's underlying data structures
      myChart.data.labels[0] = ["Answer A:","Top 5"];
      myChart.data.datasets[0].data[0] = countA;
      myChart.update();

  } else if(letter == voteB){
      countB++;
  // add new label and data point to chart's underlying data structures
      myChart.data.labels[1] = ["Answer B:","Top 10"];
      myChart.data.datasets[0].data[1] = countB;
      myChart.update();

  } else if(letter == voteC){
      countC++;
  // add new label and data point to chart's underlying data structures
      myChart.data.labels[2] = ["Answer C:","Top 15"];
      myChart.data.datasets[0].data[2] = countC;
      myChart.update();

  } else if(letter == voteD){
      countD++;
  // add new label and data point to chart's underlying data structures
      myChart.data.labels[3] = ["Answer D:","Top 20"];
      myChart.data.datasets[0].data[3] = countD;
      myChart.update();

  } else if(letter == voteE){
      countE++;
  // add new label and data point to chart's underlying data structures
      myChart.data.labels[4] = ["Answer E:","other"];
      myChart.data.datasets[0].data[4] = countE;
      myChart.update();
  } else {
    unrecognized++;
  };
//console.log(countB);
	}
})

pubnub.subscribe({
    channels: ['straw_poll']
});

	
//pubnub.subscribe({
//    channels: ['straw_poll'],
//	message: function(m){
//    var letter = m.slice(0,1).toLowerCase();
//    if (/[abcd]/.test(letter)) {
//      pollRac.add(letter);
//      pollRac.add('total');
//    }
//  }
//});

