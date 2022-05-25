/*============================================================================
   Name        : charts.js
   Path	       : public/js/roles/administrator
   Author      : BTS SNIR, Lycée Antoine Bourdelle
   Description : Administrator's charts creation
   Date 	   : 2022
============================================================================*/

const data={};
const labels = ['00h00', '04h00', '08h00', '12h00', '16h00', '20h00', '00h00'];

const dataTemperature = {
    labels: labels,
    datasets: [{
      label: 'Air',
      color: 'rgb(0,144,212)',
      backgroundColor: 'rgb(0,144,212)',
      borderColor: 'rgb(0,144,212)',
    },{
	  label: 'Sol',
      color: 'rgb(160,225,255)',
      backgroundColor: 'rgb(160,225,255)',
      borderColor: 'rgb(160,225,255)',
    }]
};
const dataHumidity = {
    labels: labels,
    datasets: [{
      label: 'Air',
      backgroundColor: 'rgb(235,110,29)',
      borderColor: 'rgb(235,110,29)',
    },{
	  label: 'Sol',
      color: 'rgb(255,176,126)',
      backgroundColor: 'rgb(255,176,126)',
      borderColor: 'rgb(255,176,126)',
    }]
};

const configTemperature = {type: 'line', data: dataTemperature, options: {
        plugins: {
            title: {
                display: true,
                text: 'Humidité aérienne et souterraine'
            },
            legend: {
				display: true,
				position: 'bottom'
			}
        }
    }};
const configHumidity = {type: 'line', data: dataHumidity, options: {
		plugins: {
            title: {
                display: true,
                text: 'Température aérienne et souterraine'
            },
	        legend: {
				display: true,
				position: 'bottom'
			}
		}
	}};

const chartTemperatureReading = new Chart(document.getElementById('groundReading'), configTemperature);
const chartHumidityReading = new Chart(document.getElementById('airReading'), configHumidity);



ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
    let chartConfig = {
      backgroundColor: 'rgb(160,225,255)',
      graphset: [{
          type: 'gauge',
          title: {
            text: 'Humiditée aérienne',
          },
          plot: {
            csize: '3%',
            size: '100%',
          },
          plotarea: {
            marginTop: '35%',
          },
          scale: {
            sizeFactor: 1.2,
            mediaRules: [{
              maxWidth: '650px',
              sizeFactor: 1.6,
            }, ],
          },
          scaleR: {
            values: '0:100:10',
            aperture: 180,
            center: {
              borderColor: 'rgb(0,144,212)',
              borderWidth: '2px',
              size: '20px',
            },
            
            item: {
              offsetR: 0,
            },
            
            ring: {
              backgroundColor: 'rgb(0,144,212)',
            },
            tick: {
              visible: false,
            },
          },
          tooltip: {
            visible: false,
          },
          series: [{
            values: [35],
            valueBox: {
              text: '%v',
              fontColor: 'rgb(0,144,212)',
              fontSize: '14px',
              placement: 'center',
            },
            backgroundColor: 'rgb(0,144,212)',
          }, ],
        }
      ],
    };

    zingchart.render({
      id: 'myChart',
      data: chartConfig,
      height: '100%',
      width: '100%',
    });

    /*
     * SetInterval is used to simulate live input. We also have
     * a feed attribute that takes in http requests, websockets,
     * and return value from a JS function.
     */
    setInterval(() => {
      let colors = ['rgb(160,225,255)', '#E2D51A', '#FB301E'];
      let Marker = (bgColor, ceiling) => {
        return {
          type: 'area',
          range: [0, ceiling],
          backgroundColor: bgColor,
          alpha: 0.95,
        };
      };
    min = Math.ceil(0);
	max = Math.floor(100);
    let output0 = Math.floor(Math.random() * (max - min +1)) + min;

      // 1) update gauge values
      zingchart.exec('myChart', 'appendseriesdata', {
        graphid: 0,
        plotindex: 0,
        update: false,
        data: {
          values: [output0],
        },
      });

      // 2) update guage markers
      zingchart.exec('myChart', 'modify', {
        graphid: 0,
        update: false,
        data: {
          scaleR: {
            markers: [Marker(colors[0], output0)],
          },
        },
      });

      // batch update all chart modifications
      zingchart.exec('myChart', 'update');
    }, 1500);
    
    ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
    let chartConfig2 = {
      backgroundColor: 'rgb(255,176,126)',
      graphset: [{
          type: 'gauge',
          title: {
            text: 'Humiditée terrestre',
          },
          plot: {
            csize: '3%',
            size: '100%',
          },
          plotarea: {
            marginTop: '35%',
          },
          scale: {
            sizeFactor: 1.2,
            mediaRules: [{
              maxWidth: '650px',
              sizeFactor: 1.6,
            }, ],
          },
          scaleR: {
            values: '0:100:10',
            aperture: 180,
            center: {
              borderColor: 'rgb(235,110,29)',
              borderWidth: '2px',
              size: '20px',
            },
            
            item: {
              offsetR: 0,
            },
            
            ring: {
              backgroundColor: 'rgb(235,110,29)',
            },
            tick: {
              visible: false,
            },
          },
          tooltip: {
            visible: false,
          },
          series: [{
            values: [35],
            valueBox: {
              text: '%v',
              fontColor: 'rgb(235,110,29)',
              fontSize: '14px',
              placement: 'center',
            },
            backgroundColor: 'rgb(235,110,29)',
          }, ],
        }
      ],
    };

    zingchart.render({
      id: 'myChart2',
      data: chartConfig2,
      height: '100%',
      width: '100%',
    });

    /*
     * SetInterval is used to simulate live input. We also have
     * a feed attribute that takes in http requests, websockets,
     * and return value from a JS function.
     */
    setInterval(() => {
      let colors = ['rgb(255,176,126)', '#E2D51A', '#FB301E'];
      let Marker = (bgColor, ceiling) => {
        return {
          type: 'area',
          range: [0, ceiling],
          backgroundColor: bgColor,
          alpha: 0.95,
        };
      };
      
    min = Math.ceil(0);
	max = Math.floor(100);
    let output0 = Math.floor(Math.random() * (max - min +1)) + min;

      // 1) update gauge values
      zingchart.exec('myChart2', 'appendseriesdata', {
        graphid: 0,
        plotindex: 0,
        update: false,
        data: {
          values: [output0],
        },
      });

      // 2) update guage markers
      zingchart.exec('myChart2', 'modify', {
        graphid: 0,
        update: false,
        data: {
          scaleR: {
            markers: [Marker(colors[0], output0)],
          },
        },
      });

      // batch update all chart modifications
      zingchart.exec('myChart2', 'update');
    }, 1500);


AjaxCall();
var idInter = setInterval(AjaxCall, 500000);//Set Interval 3s Between Each Call

function UpdateChart(data){
	j=0;
	for(i=0;i>=0;i++){
		chartTemperatureReading.data.datasets[0].data[j] = data[i].valMeasure;
		chartTemperatureReading.data.datasets[1].data[j] = 4;
		chartHumidityReading.data.datasets[0].data[j] = data[i].valMeasure;
		chartHumidityReading.data.datasets[1].data[j] = 4;
		j++;
		chartTemperatureReading.update();
		chartHumidityReading.update();
	};
};

function GetPlotName(){
	document.getElementById("plot").textContent = document.getElementById("plotList").textContent;
	document.getElementsByName
}

function AjaxCall(){
	$.get(
		'/admin/charts',	//url
		'false',		//data
		UpdateChart,	//success
		'json',		//dataType
	)
}