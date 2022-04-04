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

//AjaxCall();
var idInter = setInterval(AjaxCall, 5000); //Set Interval 3s Between Each Call

//function AjaxCall(){
//	AddMap();
//}

function AddMap(data){	
//	$(document).ready(function(){
//		$("p").hide();
//	});
	
	//---------------------- Remove Marker's Layer ---------------------//
	if(mapTech.getLayers().getLength() >= 1){
		for(let i = 1; i < mapTech.getLayers().getLength(); i++){
			mapTech.removeLayer(mapTech.getLayers().item(i));
		}
	}
	//------------------------------------------------------------------//
	
	data.forEach((measureObject) => {
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

function AjaxCall(){
	$.get(
		'/technician/map',	//Get URL
		'false', 		//
	  AddMap, 		//Call Function
		'json'			//Type of File
	)
}

/* ********************************************* Get item Layer ************************************************* */

function GetLayerEvent(feature){
	var layerMap = mapAdmin.getLayers();
	for(let i=1 ; i < layerMap.getLength(); i++){
		var featureLayer = layerMap.item(i).getSource().getFeatures()[0];
		if(feature === featureLayer){return layerMap.item(i)}
	}
	return null;
}

/* ************************************************************************************************************** */
