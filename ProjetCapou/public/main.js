const map = new ol.Map({
  layers: [ new ol.layer.Tile({
            source: new ol.source.OSM()
          })],
  target: 'map',
  view: new ol.View({
    center: ol.proj.fromLonLat([1.3092730301117868, 44.03460973142589]),
    zoom: 15,
  }),
});

function UpdateMap(){	
	const vector = new ol.layer.Vector({
		source: new ol.source.Vector({
			url: 'upload/plots/us-states.json',
			format: new ol.format.GeoJSON(),
		}),
	});


//	console.log(data.features[0]);
//	const jsonObject = data;
		
/*	
	const source = new ol.source.Vector({
  		features: new ol.format.GeoJSON().readFeatures(jsonObject),
	});

	const layer = new ol.layer.Vector({
	  source: source,
	});
	console.log(layer);*/
	
//	const vector = new ol.layer.Vector({
//	  source: new ol.source.Vector({
//	    format: 
//	    	new ol.format.GeoJSON().readFeatures(jsonObject),
//			new ol.Feature({
//				geometry: new ol.geom.Point(ol.proj.fromLonLat([10, 20]))
//				geometry: new ol.geom.Polygon([ol.proj.fromLonLat([13,49],[49,20],[20,13])])
//			}),
//	  }),
//	});
//	console.log(vector);
	
	//---------------------- Remove Marker's Layer ---------------------//
	if(map.getLayers().getLength() >= 1){
		for(let i = 1; i < map.getLayers().getLength(); i++){
			map.removeLayer(map.getLayers().item(i));
		}
	}
//	//------------------------------------------------------------------//
//	
//	data.forEach((measureObject) => {
//		var layer = new ol.layer.Vector({
//			
//			//------------------------- Marker Location ------------------------//
//			source: new ol.source.Vector({
//				features: [
//					new ol.Feature({
//		  				geometry: new ol.geom.Point(ol.proj.fromLonLat([measureObject["longitude"], measureObject["latitude"]]))
//					}),
//				]
//			}),
//			//------------------------------------------------------------------//
//			
//			//-------------------------- Marker Style --------------------------//
//			style: new ol.style.Style({
//				image: new ol.style.Circle({
//					radius: 5,
//					fill: new ol.style.Fill({color: '#46729c'}), // Marker's Fill Color(nightblue)
//					stroke: new ol.style.Stroke({color: '#FFFFFF'}) // Marker's Stroke Color(white)
//				})
//			})
//			//------------------------------------------------------------------//
//		});
		map.addLayer(vector);
//		map.addLayer(layer);
}

AjaxCall();
var idInter = setInterval(AjaxCall, 10000); //Set Interval 3s Between Each Call

function AjaxCall(){
	$.get(
		'/test/map',	//Get URL
		'false', 		//
		UpdateMap,
//	    function(data){
//			console.log(data.features[0].geometry.coordinates[0][0][0]);
//		}, 		//Call Function
		'json'			//Type of File
	)
}