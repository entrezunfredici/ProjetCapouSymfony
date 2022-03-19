//temperature °C
temperatureMax=70
temperatureMin=-30
//
function TemperatureRefresh() {
    temperature=Math.random()*(temperatureMax-temperatureMin)+temperatureMin //temperature
    //thermometer
    new RGraph.Thermometer({
        id:    'Temperature',
        min:   temperatureMin,
        max:   temperatureMax,
        value: temperature
    }).draw();
}

setInterval(TemperatureRefresh, 1000)

//humidity %
humidityMin=0
humidityMax=100

function HumidityRefresh() {
    humidity=Math.random()*(humidityMax-humidityMin)+humidityMin //humidity
    //manometer
    new RGraph.Gauge({
        id:    'Humidity',
        min:   humidityMin,
        max:   humidityMax,
        value: humidity 
    }).draw();
}

setInterval(HumidityRefresh, 1000)


//reste
data = [40,20,6,16,35,10,6,7,50];
xaxisLabels = ['Aujourdhui', 'J-1', 'J-2', 'J-3', 'J-4', 'J-5', 'J-6', 'J-7', 'J-8'];
new RGraph.Line({
    id: 'HumidityGraph',
    data: data,
    options: {
        tooltips: '%{key}',
        tooltipsFormattedUnitsPost: '%',
        tooltipsFormattedKeyColors: ['red','blue','#0f0'],
        tooltipsFormattedKeyLabels: ['John','Richard','Luis'],
        tooltipsCss: {
            fontSize: '16pt',
            textAlign: 'left'
        },
        backgroundGridVlines: false,
        backgroundGridBorder: false,
        colors: ['red','blue','green'],
        linewidth: 2,
        spline: true,
        tickmarksStyle: 'dot',
        tickmarksSize: 6,
        xaxisLabels: xaxisLabels,
        xaxis: false,
        yaxis: false,
        marginLeft: 40,
        shadow: false,
        labelsAbove: true,
        labelsAboveUnitsPost: '%',
        labelsAboveOffsety: -5
    }
}).trace();
data = [25,20,6,0,0,10,8,16,5];
xaxisLabels = ['Aujourdhui', 'J-1', 'J-2', 'J-3', 'J-4', 'J-5', 'J-6', 'J-7', 'J-8'];
new RGraph.Line({
    id: 'TemperatureGraph',
    data: data,
    options: {
        tooltips: '%{key}',
        tooltipsFormattedUnitsPost: '%',
        tooltipsFormattedKeyColors: ['red','blue','#0f0'],
        tooltipsFormattedKeyLabels: ['John','Richard','Luis'],
        tooltipsCss: {
            fontSize: '16pt',
            textAlign: 'left'
        },
        backgroundGridVlines: false,
        backgroundGridBorder: false,
        colors: ['red','blue','green'],
        linewidth: 2,
        spline: true,
        tickmarksStyle: 'dot',
        tickmarksSize: 6,
        xaxisLabels: xaxisLabels,
        xaxis: false,
        yaxis: false,
        marginLeft: 40,
        shadow: false,
        labelsAbove: true,
        labelsAboveUnitsPost: '%',
        labelsAboveOffsety: -5
    }
}).trace();