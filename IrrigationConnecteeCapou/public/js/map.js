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

var mapAdmin = new ol.Map({
	target: 'mapAdmin',
	controls: [screen, scale],
	layers: [layer],
	view: view
});

var mapMenu = new ol.Map({
    target: 'mapMenu',
    controls: [screen, scale],
    layers: [layer],
    view: view
});
var mapTech = new ol.Map({
  target: 'mapTech',
  controls: [screen, scale],
  layers: [layer],
  view: view
});