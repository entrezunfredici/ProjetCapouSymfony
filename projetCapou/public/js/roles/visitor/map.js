/*============================================================================
   Name        : map.js
   Path	       : public/js/roles/visitor
   Author      : BTS SNIR, Lycée Antoine Bourdelle
   Description : Visitor's map creation
   Date 	   : 2022
============================================================================*/

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
	if(i===0){
		layers.push(
			new ol.layer.Tile({
				visible: false,
				preload: Infinity,
				source: new ol.source.OSM(),
			})
		);
	}else{
		layers.push(
    		new ol.layer.Tile({
    			visible: false,
    			preload: Infinity,
				source: new ol.source.BingMaps({
        			key: 'AoUQ6i6QMtKu0GWUoPFfMjWfOPCVSLEIg8B5nv5EGkwo1T0yzi7AVXG2rOpZ4T6R',
        			imagerySet: styles[i],
					maxZoom: 19,
					minZoom: 5
      			}),
    		})
  		);
	}
  	
}

const select = document.getElementById('layer-select');
function onChange() {
  const style = select.value;
  for (let i = 0, ii = layers.length; i < ii; ++i) {
	if(i===0){
		layers[i].setVisible(new ol.source.OSM())
	}else{
		layers[i].setVisible(styles[i] === style);
	}
  }
}
select.addEventListener('change', onChange);
onChange();

var mapVisitor = new ol.Map({
  target: 'mapVisitor',
  controls: [screen, scale],
  layers: layers,
  view: view
});