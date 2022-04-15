/*============================================================================
   Name        : charts.js
   Path	       : public/js/roles/administrator
   Author      : BTS SNIR, Lycée Antoine Bourdelle
   Description : Administrator's charts creation
   Date 	   : 2022
============================================================================*/

const data={};
const labels = ['00h00', '04h00', '08h00', '12h00', '16h00', '20h00', '00h00'];

const dataWaterConsumption = {
    labels: labels,
    datasets: [{
      label: 'Consommation hydrique (m³)',
      color: 'rgb(0,144,212)',
      backgroundColor: 'rgb(0,144,212)',
      borderColor: 'rgb(0,144,212)',
    }]
};
const dataHumidityLevel = {
    labels: labels,
    datasets: [{
      label: 'Taux d\'humidité',
      backgroundColor: 'rgb(0,144,212)',
      borderColor: 'rgb(0,144,212)',
    }]
};

const configWaterConsumption = {type: 'line', data: dataWaterConsumption, options: {}};
const configHumidityLevel = {type: 'line', data: dataHumidityLevel, options: {}};

const chartWaterConsumption = new Chart(document.getElementById('waterConsumptionChart'), configWaterConsumption);
const chartHumidityLevel = new Chart(document.getElementById('humidityLevelChart'), configHumidityLevel);

AjaxCall();
var idInter = setInterval(AjaxCall, 10000);//Set Interval 3s Between Each Call

function UpdateChart(data){
	i=data.length-labels.length;
	console.log(i);
	j=0;
	for(i=data.length-labels.length;i<data.length;i++){
		chartWaterConsumption.data.datasets[0].data[j] = data[i].valMeasure;
		j++;
		chartWaterConsumption.update();
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