var mapMenu = new ol.Map({
    target: 'mapMenu',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([1.3075260,44.0317357]),
      zoom: 15
    })
});
var mapTech = new ol.Map({
  target: 'mapTech',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([1.3075260,44.0317357]),
    zoom: 15
  })
});
