/*============================================================================
   Name        : map.js
   Path	       : public/js/roles/administrator
   Author      : BTS SNIR, Lycée Antoine Bourdelle
   Description : Administrator's map creation
   Date 	   : 2022
============================================================================*/

var screen = new ol.control.FullScreen();
var scale = new ol.control.ScaleLine();
var select = 
	new ol.interaction.Select({style: new ol.style.Style({
	    stroke: new ol.style.Stroke({
	      color: '#FFFFFF',
	      width: 2,
	    }),
	}),
});

//----------------- Elements that make up the popup ----------------//
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');
//------------------------------------------------------------------//
//------------------- Overlay to anchor the popup ------------------//
const overlay = new ol.Overlay({
	element: container
});
//------------------------------------------------------------------//

var mapAdmin = new ol.Map({
	interactions: ol.interaction.defaults().extend([select]),
	overlays: [overlay],
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

//------------------- Click handler to hide popup ------------------//
closer.onclick = function () {
	overlay.setPosition(undefined);
  	closer.blur();
  	return false;
};
//------------------------------------------------------------------//
//------------------ Click handler to render popup -----------------//
mapAdmin.on('singleclick', function (evt) {
  	const coordinate = evt.coordinate;
  	const hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordinate));

  	content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
  	overlay.setPosition(coordinate);
});
//------------------------------------------------------------------//

AjaxStacketCall();
setInterval(AjaxStacketCall, 10000);

AjaxPlotCall();
setInterval(AjaxPlotCall, 15000);

function UpdateStacket(data){	
	
	//---------------------- Remove Marker's Layer ---------------------//
	if(mapAdmin.getLayers().getLength() >= 1){
		for(let i = 1, ii = mapAdmin.getLayers().getLength(); i < ii; i++){
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
					}), // Marker's Stroke Color(white)
					fill: new ol.style.Fill({
						color: 'rgba(0,0,0,0)',
					})
				})
			})
			//------------------------------------------------------------------//
		});
		mapAdmin.addLayer(layer);
	})
}

function UpdatePlot(data){
	
	//---------------------- Remove Marker's Layer ---------------------//
//	if(mapAdmin.getLayers().getLength() >= 1){
//		for(let i = 1, ii = mapAdmin.getLayers().getLength(); i < ii; i++){
//			mapAdmin.removeLayer(mapAdmin.getLayers().item(i));
//		}
//	}
	//------------------------------------------------------------------// 
	
	data.forEach((plotObject) => {
		var vector = new ol.layer.Vector({
			source: new ol.source.Vector({
				url: plotObject["filepath"],
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
		mapAdmin.addLayer(vector);
	});
}

function AjaxStacketCall(){
	$.get(
		'/admin/map/stacket',	//Get URL
		'false',
	    UpdateStacket,			//Call Function
		'json'					//Type of File
	)
}

//var $j = jQuery.noConflict();
function AjaxPlotCall(){
	$.get(
		'/admin/map/plot',	//Get URL
		'false',
	    UpdatePlot,			//Call Function
		'json'				//Type of File
	)
}