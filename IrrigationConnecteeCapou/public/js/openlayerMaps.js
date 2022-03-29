var layer = new ol.layer.Tile({
	source: new ol.source.OSM(),
});

var screen = new ol.control.FullScreen();
var scale = new ol.control.ScaleLine();

var center = ol.proj.fromLonLat([1.3076535161998597, 44.03552573763338]);
var view = new ol.View({   
	center: center,
	zoom: 15,
});

const styles = [
  'Classic',
  'AerialWithLabelsOnDemand',
  'RoadOnDemand',
  'CanvasDark',
];
const layers = [];
let i, ii;
for (i = 0, ii = styles.length; i < ii; ++i) {
  layers.push(
    new ol.layer.Tile({
      visible: false,
      preload: Infinity,
      source: new ol.source.BingMaps({
        key: 'AoUQ6i6QMtKu0GWUoPFfMjWfOPCVSLEIg8B5nv5EGkwo1T0yzi7AVXG2rOpZ4T6R',
        imagerySet: styles[i],
        // use maxZoom 19 to see stretched tiles instead of the BingMaps
        // "no photos at this zoom level" tiles
        // maxZoom: 19
      }),
    })
  );
}


const select = document.getElementById('layer-select');
function onChange() {
  const style = select.value;
  for (let i = 0, ii = layers.length; i < ii; ++i) {
    layers[i].setVisible(styles[i] === style);
  }
}
select.addEventListener('change', onChange);
onChange();


var mapAdmin = new ol.Map({
	target: 'mapAdmin',
	controls: [screen, scale],
	layers: [layer],
	view: view
});
var mapMenu = new ol.Map({
  layers: layers,
  target: 'mapMenu',
  view: view
});
var mapTech = new ol.Map({
  target: 'mapTech',
  controls: [screen, scale],
  layers: layers,
  view: view
});