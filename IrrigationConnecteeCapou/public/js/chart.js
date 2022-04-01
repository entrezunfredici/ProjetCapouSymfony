const data={};
const labels = ['00h00', '04h00', '08h00', '12h00', '16h00', '20h00', '00h00'];

const dataWaterConsumption = {
    labels: labels,
    datasets: [{
      label: 'Consommation hydrique',
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
	i=0;
	data.forEach(function(){
		console.log(data[i].valMeasure);
		chartWaterConsumption.data.datasets[0].data[i] = data[i].valMeasure;
		i++;
		chartWaterConsumption.update();
		}
	)
};

function AjaxCall(){
	$.get(
		'/admin/charts',	//url
		data,		//data
		UpdateChart,	//success
		'json',		//dataType
	)
}