    var voteA = "a";
    var voteB = "b";
    var voteC = "c";
    var voteD = "d";
    var voteE = "e";
    var countA = 0; //to count the number of match
    var countB = 0; //to count the number of match
    var countC = 0; //to count the number of match
    var countD = 0; //to count the number of match
    var countE = 0; //to count the number of match
    var unrecognized = 0; //to count the number of match

// create initial empty chart
var ctx_live = document.getElementById("mycanvas");
var myChart = new Chart(ctx_live, {
  type: 'horizontalBar',
  data: {
    labels: [["Answer A:","Top 5"],["Answer B:","Top 10"],["Answer C:","Top 15"],["Answer D:","Top 20"],["Answer E:","Other"]],
    datasets: [{
      data: [],
       "label":"# of Votes",
        backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
            ],
		borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    legend: {
      display: false
    },
    plugins: {
        datalabels: {
          align: function(context) {
            var index = context.dataIndex;
            var value = context.dataset.data[index];
            var invert = Math.abs(value) <= 1;
            return value < 1 ? 'end' : 'start'
          },
          anchor: 'end',
          backgroundColor: null,
          borderColor: null,
          borderRadius: 4,
          borderWidth: 1,
          color: '#fff',
          font: {
            size: 20,
            weight: 600
          },
          offset: 20,
          padding: 0,
          formatter: function(value) {
              return Math.round(value * 10) / 10
          }
        }
      },
    scales: {
      yAxes: [{
        ticks: {
          fontSize: 18,
          mirror: false
        },
        maxBarThickness: 80,
        gridLines: {
          display: false
        },
        pointLabels: {
           fontSize: 15
        },
        scaleLabel: {
          "display":true,
          "labelString":" ",
          "fontColor": "#000",
          "fontSize": "25"
       }
      }],
      xAxes: [{
        display: false,
        ticks: {
            min: 0,
            suggestedMax: 5,  
            fontSize: 15
        }
          }]      
    },
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

