/*============================================================================
   Name        : charts.js
   Path	       : public/js/roles/administrator
   Author      : BTS SNIR, Lycée Antoine Bourdelle
   Description : Administrator's charts creation
   Date 	   : 2022
============================================================================*/

const data={};
	
//-------------------------- Data's Chart --------------------------//
const dataHumidityInt = {
    datasets: [{
      borderColor: 'rgb(0,144,212)',
    }]
};
const dataHumidityExt = {
    datasets: [{
      borderColor: 'rgb(160,225,255)',
    }]
};
const dataTemperatureInt = {
    datasets: [{
      borderColor: 'rgb(235,110,29)',
    }]
};
const dataTemperatureExt = {
    datasets: [{
      borderColor: 'rgb(255,176,126)',
    }]
};
//------------------------------------------------------------------//

//------------------------ Config's Chart -------------------------//
const configHumidityInt = {type: 'line', data: dataHumidityInt, options: {
	plugins: {
        title: {
            display: true,
            text: 'Humidité interne'
        },
        legend: {
			display: false,
			position: 'bottom'
		}
	},
	scales: {
		y : {
			title: {
				display: true,
				text: "taux d\'humidité (%)"
			},
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
			display: false,
			position: 'bottom'
		}
	},
	scales: {
        y : {
			title: {
				display: true,
				text: "taux d\'humidité (%)"
			},
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
const configTemperatureInt = {type: 'line', data: dataTemperatureInt, options: {
	plugins: {
        title: {
            display: true,
            text: 'Température interne'
        },
        legend: {
			display: false,
			position: 'bottom'
		}
	},
	scales: {
		y : {
			title: {
				display: true,
				text: "température (°C)"
			},
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
const configTemperatureExt = {type: 'line', data: dataTemperatureExt, options: {
	plugins: {
        title: {
            display: true,
            text: 'Température externe'
        },
        legend: {
			display: false,
			position: 'bottom'
		}
	},
	scales: {
		y : {
			title: {
				display: true,
				text: "température (°C)"
			},
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
//------------------------------------------------------------------//

//----------------------- Chart's Creation' -----------------------//
const chartIntHumidity = new Chart(document.getElementById('humidityInternal'), configHumidityInt);
const chartExtHumidity = new Chart(document.getElementById('humidityExternal'), configHumidityExt);
const chartIntTemperature = new Chart(document.getElementById('temperatureInternal'), configTemperatureInt);
const chartExtTemperature = new Chart(document.getElementById('temperatureExternal'), configTemperatureExt);
//------------------------------------------------------------------//

let configInstantHumidityInt = {
	graphset: [{
  		type: 'gauge', 								//Chart's type
  		title: {									//Chart's title
    		text: 'Humiditée interne instantanée',	//Title
    		fontColor: 'grey',						//Title's color
    		fontSize: '11px',						//Title's size
  		},
		plot: {										//Center
			valueBox: {								//Center's value
              	text: '%v',							//Text's value
              	fontColor: 'grey',					//Text's color
              	fontSize: '15px',					//Text's size
              	placement: 'center',				//Text's placement (center, tip or edge)
        	},
		},
      	plotarea: {									//Chart's area
        	marginTop: '35%',						//Area Margin Top
      	},
      	scale: {									//Chart's scale
        	sizeFactor: "175%",						//Scale factor
      	},
		scaleR: { 									//Radial scale
            values: '0:100:10', 					//min:max:step
            aperture: 180, 							//Scale range
            center: {								//Gauge center
				size: '15px',						//Center's size					
              	borderColor: 'rgb(0,144,212)',		//Border center's color
              	borderWidth: '2px',					//Border center's width
          	},
          	ring: {									//Gauge ring
				size: '5px',						//Ring's size
          		backgroundColor: 'rgb(0,144,212)',	//Ring's color
        	},
        	item: {									//Scale label
          		offsetR: 0,							//Label's placement
        	},
        },
		series: [{
        	values: [0],							//Starting value
        	csize: "5%", 							//Needle width
        	size: "75%", 							//Needle length
        	'background-color': 'rgb(0,144,212)',	//Needle color
        	indicator: [0,0.5,0,0,0],				//[Base's radius, Tip's radius, Base’s angle, tTp’s angle, Offset]
  		}],
	}],
};

zingchart.render({
  	id: 'humidityInternalInstant',
  	data: configInstantHumidityInt,
  	height: '100%',
  	width: '100%',
});

AjaxMeasuresCall();
AjaxIdPlotCall();
setInterval(AjaxIdPlotCall, 10000);
setInterval(AjaxMeasuresCall, 10000);

function DeleteIntHumidityDataChart(){
	for(let m=0; chartIntHumidity.data.datasets[0].data[m] || chartIntHumidity.data.labels[m]; m++){
		chartIntHumidity.data.datasets[0].data[m] = null;
		chartIntHumidity.data.labels[m] = null;
	}
}
function DeleteExtHumidityDataChart(){
	for(let m=0; chartExtHumidity.data.datasets[0].data[m] || chartExtHumidity.data.labels[m]; m++){
		chartExtHumidity.data.datasets[0].data[m] = null;
		chartExtHumidity.data.labels[m] = null;
	}
}
function DeleteIntTemperatureDataChart(){
	for(let m=0; chartIntTemperature.data.datasets[0].data[m] || chartIntTemperature.data.labels[m]; m++){
		chartIntTemperature.data.datasets[0].data[m] = null;
		chartIntTemperature.data.labels[m] = null;
	}
}
function DeleteExtTemperatureDataChart(){
	for(let m=0; chartExtTemperature.data.datasets[0].data[m] || chartExtTemperature.data.labels[m]; m++){
		chartExtTemperature.data.datasets[0].data[m] = null;
		chartExtTemperature.data.labels[m] = null;
	}
}

var idPlot=0;
function UpdateChart(data){

	//-------------------- Internal Humidity Update --------------------//	
	var intHumidityVal = [];
	var intHumidityLbl = [];
	for(let m=0; data[m]; m++){
		if(data[m].cardsMeasure == idPlot){
			if(data[m].measureType == "taux_humidite_sol"){
				intHumidityVal.push(data[m].valMeasure);
				intHumidityLbl.push(data[m].timeMeasure);
			}
		}
	}
	DeleteIntHumidityDataChart();
	let nmbIntHumidity = 0;
	for(let i=intHumidityVal.length-3; (nmbIntHumidity <= 4) && (i <= intHumidityVal.length); i++){
		if(i <= 0){;}
		else{
			chartIntHumidity.data.datasets[0].data[nmbIntHumidity] = intHumidityVal[i-1];
			chartIntHumidity.data.labels[nmbIntHumidity] = intHumidityLbl[i-1];
			nmbIntHumidity++;
		}
	}
	//------------------------------------------------------------------//
	
	//-------------------- External Humidity Update --------------------//	
	var extHumidityVal = [];
	var extHumidityLbl = [];
	for(let m=0; data[m]; m++){
		if(data[m].cardsMeasure == idPlot){
			if(data[m].measureType == "taux_humidite_air"){
				extHumidityVal.push(data[m].valMeasure);
				extHumidityLbl.push(data[m].timeMeasure);
			}
		}
	}
	DeleteExtHumidityDataChart();
	let nmbExtHumidity = 0;
	for(let i=extHumidityVal.length-3; (nmbExtHumidity <= 4) && (i <= extHumidityVal.length); i++){
		if(i <= 0){;}
		else{
			chartExtHumidity.data.datasets[0].data[nmbExtHumidity] = extHumidityVal[i-1];
			chartExtHumidity.data.labels[nmbExtHumidity] = extHumidityLbl[i-1];
			nmbExtHumidity++;
		}
	}
	//------------------------------------------------------------------//
	
	//------------------ Internal Temperature Update -------------------//	
	var intTemperatureVal = [];
	var intTemperatureLbl = [];
	for(let m=0; data[m]; m++){
		if(data[m].cardsMeasure == idPlot){
			if(data[m].measureType == "temperature_sol"){
				intTemperatureVal.push(data[m].valMeasure);
				intTemperatureLbl.push(data[m].timeMeasure);
			}
		}
	}
	DeleteIntTemperatureDataChart();
	let nmbIntTemperature = 0;
	for(let i=intTemperatureVal.length-3; (nmbIntTemperature <= 4) && (i <= intTemperatureVal.length); i++){
		if(i <= 0){;}
		else{
			chartIntTemperature.data.datasets[0].data[nmbIntTemperature] = intTemperatureVal[i-1];
			chartIntTemperature.data.labels[nmbIntTemperature] = intTemperatureLbl[i-1];
			nmbIntTemperature++;
		}
	}
	//------------------------------------------------------------------//
	
	//------------------ External Temperature Update -------------------//	
	var extTemperatureVal = [];
	var extTemperatureLbl = [];
	for(let m=0; data[m]; m++){
		if(data[m].cardsMeasure == idPlot){
			if(data[m].measureType == "temperature_air"){
				extTemperatureVal.push(data[m].valMeasure);
				extTemperatureLbl.push(data[m].timeMeasure);
			}
		}
	}
	DeleteExtTemperatureDataChart();
	let nmbExtTemperature = 0;
	for(let i=extTemperatureVal.length-3; (nmbExtTemperature <= 4) && (i <= extTemperatureVal.length); i++){
		if(i <= 0){;}
		else{
			chartExtTemperature.data.datasets[0].data[nmbExtTemperature] = extTemperatureVal[i-1];
			chartExtTemperature.data.labels[nmbExtTemperature] = extTemperatureLbl[i-1];
			nmbExtTemperature++;
		}
	}
	//------------------------------------------------------------------//


//	let colors = ['rgb(160,225,255)', '#E2D51A', '#FB301E'];
	let Marker = (bgColor, ceiling) => {
		return {
			type: 'area',
			range: [0, ceiling],
			backgroundColor: bgColor,
  			alpha: 0.95,
    	};
  	};

  	// 1) update gauge values
  	var instantIntHumidity
	if(intHumidityVal[intHumidityVal.length-1]){
		instantIntHumidity = intHumidityVal[intHumidityVal.length-1];
	}
	else{
		instantIntHumidity = 0;
	}
  	zingchart.exec('humidityInternalInstant', 'appendseriesdata', {
//    	graphid: 0,
    	plotindex: 0,
    	update: false,
    	data: {
      		values: [instantIntHumidity],
    	},
  	});

  	// 2) update guage markers
  	zingchart.exec('humidityInternalInstant', 'modify', {
//    	graphid: 0,
    	update: false,
    	data: {
      		scaleR: {
        		markers: [Marker('rgb(160,225,255)', instantIntHumidity)],
      		},
    	},
  	});

  	// batch update all chart modifications
    zingchart.exec('humidityInternalInstant', 'update');

	chartIntHumidity.update();
	chartExtHumidity.update();
	chartIntTemperature.update();
	chartExtTemperature.update();
};

function GetPlotName(id){
	const div = document.querySelector('#plotName');
	if(document.getElementById("plot")){
		document.getElementById("plotName").removeChild(document.getElementById("plot"));
	}
	div.innerHTML += `<h2 id="plot" class="text-center">Parcelle n°${id}</h2>`;
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