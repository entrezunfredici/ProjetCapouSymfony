/*============================================================================
   Name        : map.js
   Path	       : public/js/roles/technician
   Author      : BTS SNIR, Lycée Antoine Bourdelle
   Description : Technician's map creation
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


var mapTech = new ol.Map({
  target: 'mapTech',
  controls: [screen, scale],
  layers: layers,
  view: view
});


AjaxCall();
var idInter = setInterval(AjaxCall, 5000); //Set Interval 5s Between Each Call

function UpdateMap(data){	
	//---------------------- Remove Marker's Layer ---------------------//
	if(mapTech.getLayers().getLength() >=ii){
		for(let i = ii; i < mapTech.getLayers().getLength(); i++){
			mapTech.removeLayer(mapTech.getLayers().item(i));
		}
	}
	//------------------------------------------------------------------//
	
	data.forEach((measureObject) => {
		if(styles)
		var layer = new ol.layer.Vector({
			
			//------------------------- Marker Location ------------------------//
			source: new ol.source.Vector({
				features: [
					new ol.Feature({
		  				geometry: new ol.geom.Point(ol.proj.fromLonLat([measureObject["longitude"], measureObject["latitude"]]))
					}),
				]
			}),
			//------------------------------------------------------------------//
			
			//-------------------------- Marker Style --------------------------//
			style: new ol.style.Style({
				image: new ol.style.Circle({
					radius: 5,
					fill: new ol.style.Fill({color: '#46729c'}), // Marker's Fill Color(nightblue)
					stroke: new ol.style.Stroke({color: '#FFFFFF'}) // Marker's Stroke Color(white)
				})
			})
			//------------------------------------------------------------------//
		});
		mapTech.addLayer(layer);
	})
}
var $j = jQuery.noConflict();

function AjaxCall(){
	$j.get(
		'/technician/map',	//Get URL
		'false', 			//
	  	UpdateMap, 			//Call Function
		'json'				//Type of File
	)
}
/* ********************************************* Get item Layer ************************************************* */
function GetLayerEvent(feature){
	var layerMap = mapTech.getLayers();
	for(let i=1 ; i < layerMap.getLength(); i++){
		var featureLayer = layerMap.item(i).getSource().getFeatures()[0];
		if(feature === featureLayer){return layerMap.item(i)}
	}
	return null;
}
/* ************************************************************************************************************** */