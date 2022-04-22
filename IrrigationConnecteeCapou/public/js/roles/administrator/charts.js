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

AjaxCall();
var idInter = setInterval(AjaxCall, 10000);//Set Interval 3s Between Each Call

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

function AjaxCall(){
	$.get(
		'/admin/charts',	//url
		'false',		//data
		UpdateChart,	//success
		'json',		//dataType
	)
}