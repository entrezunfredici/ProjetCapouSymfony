/*============================================================================
   Name        : map.js
   Path	       : public/js/roles/visitor
   Author      : BTS SNIR, Lycée Antoine Bourdelle
   Description : Visitor's map creation
   Date 	   : 2022
============================================================================*/

var screen = new ol.control.FullScreen();
var scale = new ol.control.ScaleLine();

var mapVisitor = new ol.Map({
    target: 'mapVisitor',
    controls: [screen, scale],
    layers: [
		new ol.layer.Tile({
			source: new ol.source.XYZ({
				url:'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key='+'QUh8gnCRN3cFAfJBOytg#1.3219280948873624/0/0',
			})
		})
    ],
    view: new ol.View({
		center: ol.proj.fromLonLat([1.3075260,44.0317357]),
		zoom: 15
    })
});