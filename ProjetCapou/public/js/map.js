var screen = new ol.control.FullScreen();
var scale = new ol.control.ScaleLine();

var mapAdmin = new ol.Map({
      target: 'mapAdmin',
	  controls: [screen, scale],	
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([1.307, 44.035]),
        zoom: 4
      })
});

var layer = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [
      new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([1.307, 44.035]))
      }),
    ]
  }),
  style: new ol.style.Style({
    image: new ol.style.Circle({
   				radius: 5,
   				fill: new ol.style.Fill({color: '#46729c'}), // Marker's Fill Color(nightblue)
   				stroke: new ol.style.Stroke({color: '#FFFFFF'}) // Marker's Stroke Color(white)
    })
  })
});      

mapAdmin.addLayer(layer);

var mapMenu = new ol.Map({
    target: 'mapMenu',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([1.3075260,44.0317357]),
      zoom: 15,
    })
});
var mapTech = new ol.Map({
  target: 'mapTech',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([1.3075260,44.0317357]),
    zoom: 15,
  })
});

//AjaxCall();
var idInter = setInterval(AjaxCall, 60000); //Set Interval 3s Between Each Call

//function AjaxCall(){
//	AddMap();
//}

function AddMap(data){	
//	$(document).ready(function(){
//		$("p").hide();
//	});
	
	//---------------------- Remove Marker's Layer ---------------------//
	if(mapAdmin.getLayers().getLength() >= 1){
		for(let i = 1; i < mapAdmin.getLayers().getLength(); i++){
			mapAdmin.removeLayer(mapAdmin.getLayers().item(i));
		}
	}
	//------------------------------------------------------------------//
	
	data.forEach((dataObject) => {
		var layer = new ol.layer.Vector({
			
			//------------------------- Marker Location ------------------------//
			source: new ol.source.Vector({
				features: [
					new ol.Feature({
		  				geometry: new ol.geom.Point(ol.proj.fromLonLat([dataObject["longitude"], dataObject["latitude"]]))
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
		mapAdmin.addLayer(layer);
	})
}

function AjaxCall(){
	$.get(
		'/admin/map',	//Get URL
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
