/*============================================================================
   Name        : map.js
   Path	       : public/js/roles/administrator
   Author      : BTS SNIR, Lycée Antoine Bourdelle
   Description : Administrator's map creation
   Date 	   : 2022
============================================================================*/

var screen = new ol.control.FullScreen();
var scale = new ol.control.ScaleLine();
var select = new ol.interaction.Select({
	style: new ol.style.Style({
		    stroke: new ol.style.Stroke({
		      color: '#FFFFFF',
		      width: 2,
		    }),
  		}),
});
const translate = new ol.interaction.Translate({
	features: select.getFeatures(),
});

var mapAdmin = new ol.Map({
	target: 'mapAdmin',
	controls: [screen, scale],
	layers: [
		new ol.layer.Tile({
        	source: new ol.source.XYZ({
        		url:'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key='+'QUh8gnCRN3cFAfJBOytg#1.3219280948873624/0/0',
        	})
        })
	],
	view: new ol.View({
        center: ol.proj.fromLonLat([1.3092730301117868, 44.03460973142589]),
        zoom: 15
	})
});

AjaxCall();
var idInter = setInterval(AjaxCall, 50000);

function UpdateMap(data){	
	
	const vector = new ol.layer.Vector({
		source: new ol.source.Vector({
			url: 'upload/plots/us-states.json',
			format: new ol.format.GeoJSON(),
		}),
		style: new ol.style.Style({
		    stroke: new ol.style.Stroke({
		      color: '#b1c903',
		      width: 2,
		    }),
		    fill: new ol.style.Fill({
				color: 'rgba(0,0,0,0)',
			})
  		}),
	});
		
	//---------------------- Remove Marker's Layer ---------------------//
	if(mapAdmin.getLayers().getLength() >= 1){
		for(let i = 1, ii = mapAdmin.getLayers().getLength(); i <= ii; ++i){
			mapAdmin.removeLayer(mapAdmin.getLayers().item(i));
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
					stroke: new ol.style.Stroke({
						color: '#b1c903',
						width: 2,
					}) // Marker's Stroke Color(white)
				})
			})
			//------------------------------------------------------------------//
		});
		mapAdmin.addLayer(layer);
	})
	mapAdmin.addInteraction(select);
	mapAdmin.addLayer(vector);

}

function AjaxCall(){
	$.get(
		'/admin/map',	//Get URL
		'false', 		//
	    UpdateMap, 		//Call Function
		'json'			//Type of File
	)
}