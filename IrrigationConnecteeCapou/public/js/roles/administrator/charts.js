/*============================================================================
   Name        : charts.js
   Path	       : public/js/roles/administrator
   Author      : BTS SNIR, Lycée Antoine Bourdelle
   Description : Administrator's charts creation
   Date 	   : 2022
============================================================================*/

const data={};
const labels = ['00h00', '04h00', '08h00', '12h00', '16h00', '20h00', '00h00'];

const dataHumidityInt = {
//    labels: labels,
    datasets: [
	{
      label: 'Air',
      color: 'rgb(0,144,212)',
      backgroundColor: 'rgb(0,144,212)',
      borderColor: 'rgb(0,144,212)',
    }
    ]
};

const dataHumidityExt = {
//    labels: labels,
    datasets: [{
      label: 'Air',
      color: 'rgb(160,225,255)',
      backgroundColor: 'rgb(160,225,255)',
      borderColor: 'rgb(160,225,255)',
    }
    ]
};

const configHumidityInt = {type: 'line', data: dataHumidityInt, options: {
	plugins: {
        title: {
            display: true,
            text: 'Humidité interne'
        },
        legend: {
			display: true,
			position: 'bottom'
		}
	},
	scales: {
		y : {
			title: {
				display: true,
				text: "taux d\'humidité (%)"
			},
//			ticks: {
//          		stepSize: 20
//        	},
			beginAtZero: true,
			max : 100
		},
        x : {
			title: {
				display: true,
				text: "temps (h:min:s)"
			},
		}
    },
}};
	
const configHumidityExt = {type: 'line', data: dataHumidityExt, options: {
	plugins: {
        title: {
            display: true,
            text: 'Humidité externe'
        },
        legend: {
			display: true,
			position: 'bottom'
		}
	},
	scales: {
        y : {
			title: {
				display: true,
				text: "taux d\'humidité (%)"
			},
//			ticks: {
//          		stepSize: 20
//        	},
			beginAtZero: true,
			max : 100
        },
        x : {
			title: {
				display: true,
				text: "temps (h:min:s)"
			},
		}
    },
}};

const chartIntHumidity = new Chart(document.getElementById('humidityInternal'), configHumidityInt);
const chartExtHumidity = new Chart(document.getElementById('humidityExternal'), configHumidityExt);


const dataTemperature = {
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
                text: 'Température interne et externe'
            },
            legend: {
				display: true,
				position: 'bottom'
			}
        }
    }};
    
const chartTemperatureReading = new Chart(document.getElementById('temperatureReading'), configTemperature);

ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
    let chartConfig = {
      backgroundColor: 'rgb(160,225,255)',
      graphset: [{
          type: 'gauge',
          title: {
            text: 'Humiditée interne',
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
            values: [0],
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
      id: 'chartAirHumidity',
      data: chartConfig2,
      height: '100%',
      width: '100%',
    });

    /*
     * SetInterval is used to simulate live input. We also have
     * a feed attribute that takes in http requests, websockets,
     * and return value from a JS function.
     */
//    setInterval(() => {
//      let colors = ['rgb(255,176,126)', '#E2D51A', '#FB301E'];
//      let Marker = (bgColor, ceiling) => {
//        return {
//          type: 'area',
//          range: [0, ceiling],
//          backgroundColor: bgColor,
//          alpha: 0.95,
//        };
//      };
//      
//    min = Math.ceil(0);
//	max = Math.floor(100);
//    let output0 = Math.floor(Math.random() * (max - min +1)) + min;
//
//      // 1) update gauge values
//      zingchart.exec('myChart2', 'appendseriesdata', {
//        graphid: 0,
//        plotindex: 0,
//        update: false,
//        data: {
//          values: [output0],
//        },
//      });
//
//      // 2) update gauge markers
//      zingchart.exec('myChart2', 'modify', {
//        graphid: 0,
//        update: false,
//        data: {
//          scaleR: {
//            markers: [Marker(colors[0], output0)],
//          },
//        },
//      });
//
//      // batch update all chart modifications
//      zingchart.exec('myChart2', 'update');
//    }, 1500);


AjaxMeasuresCall();
AjaxIdPlotCall();
setInterval(AjaxIdPlotCall, 10000);
setInterval(AjaxMeasuresCall, 10000);

var idPlot=0;
function UpdateChart(data){
	
	console.log(data[data.length-1]);
	
//	for(let m=0; data[m]; m++){
//		
//	}
	
	let i=0, j=0, k=0, l=0;
	data.forEach((measureObject)=>{		
		if(measureObject["cardsMeasure"]==idPlot){
			if(measureObject["measureType"]=="taux_humidite_sol"){
				if(i==10){;}
				else{
					chartIntHumidity.data.datasets[0].data[i] = measureObject["valMeasure"];
					chartIntHumidity.data.labels[i] = measureObject["timeMeasure"];
					i++;
				}
			}
			else if(measureObject["measureType"]=="taux_humidite_air"){
				chartExtHumidity.data.datasets[0].data[j] = measureObject["valMeasure"];
				j++;
			}
			else if(measureObject["measureType"]=="temperature_air"){
				chartTemperatureReading.data.datasets[0].data[k] = measureObject["valMeasure"];
				k++;
			}
			else if(measureObject["measureType"]=="temperature_sol"){
				chartTemperatureReading.data.datasets[1].data[l] = measureObject["valMeasure"];
				l++;
			}
//			zingchart.exec('chartAirHumidity', 'modify', {
//				graphid: 0,
//				update: false,
//				data: {
//					scaleR: {
//						markers: [Marker(colors[0], output0)],
//					},
//				},
//			});			
			 
        }
	})
	chartIntHumidity.update();
	chartTemperatureReading.update();
};

function GetPlotName(id){
	const div = document.querySelector('#plotName');
	if(document.getElementById("plot")){
		document.getElementById("plotName").removeChild(document.getElementById("plot"));
	}
	div.innerHTML += `<h2 id="plot" class="text-center">Parcelle n°${id}</h2>`;
	for(let j=0; chartIntHumidity.data.datasets[0].data[j]; j++){
		chartIntHumidity.data.datasets[0].data[j]=null;
	}
	for(let j=0; chartTemperatureReading.data.datasets[0].data[j]||chartTemperatureReading.data.datasets[1].data[j]; j++){
		chartTemperatureReading.data.datasets[0].data[j]=null;
		chartTemperatureReading.data.datasets[1].data[j]=null;
	}
	AjaxMeasuresCall();
	idPlot=id;
}

let i=0;
function AjaxIdPlotCall(){
	$.get(
		'/admin/idPlots',
		'false',
		function(data){
			const div = document.querySelector('#dropdownMenu');
			data.forEach((plotObject) => {
				if(i!=0){
					document.getElementById("dropdownMenu").removeChild(document.getElementById(plotObject["idPlot"]));
				}
				div.innerHTML += `<a id=${plotObject["idPlot"]} class="dropdown-item" onclick="GetPlotName(this.id);">parcelle n°${plotObject["idPlot"]}</a>`;
			})
			i=1;
		},
		'json',
	)
}

function AjaxMeasuresCall(){
	$.get(
		'/admin/charts',	//url
		'false',		//data
		UpdateChart,	//success
		'json',		//dataType
	)
}