/* File: region.js
 * Organization: Technical Entrepreneurs <Tech-Es>
 * Contributors: 
 * Date: 10/25/2014
 * Desc: This is the region handler, it builds the display of the custom map based on region clicked. 
 * requires: lib.config, lib.data;
 */
var config = require('/lib/config');
var Map = require('ti.map');
var data = require('/lib/data');
var regionWindow = Ti.UI.currentWindow;


var location = regionWindow.locale;
var regionid = 0;
var center = {};
var zoom = .1;
switch(location)
{
	case 'Bristol':
		regionid = 1;
		center = {Lat: 41.679639, Long: -71.260523};
		zoom = .05;
	break;
	
	case 'Campus':
		regionid = 2;
		center = {Lat: 41.650615, Long: -71.260282};
		zoom = .01;
	break;
	
	case 'Baypoint':
		regionid = 3;
		center = {Lat: 41.631221, Long: -71.249136};
		zoom = .05;
	break;
}

var region = {
	stops: [],
	container: null,
	scaleFactor: null,
	pins: [],
	init: function()
	{
		var AppData = new data();
		var stops = AppData.getStops(regionid);
		var MapView = this.buildMap();
		regionWindow.add(MapView);
		for(i in stops)
		{
			//Ti.API.info(stops[i]);
			//var mountainView = ;
			MapView.addAnnotation(this.addStops(regionid, stops[i], i, stops[i][2][0], stops[i][2][1]));
		}

		regionWindow.add(this.buildControlBar());
		//this.clean();
	},

	buildMap: function()
	{
		var mapview = Map.createView({
		    mapType: Map.NORMAL_TYPE,
		    region: {latitude:center.Lat, longitude:center.Long,
		            latitudeDelta:zoom, longitudeDelta:zoom},
		    animate:true,
		    regionFit:true,
		    userLocation:true,
		    annotations:this.pins
		});
		
		mapview.addEventListener('click', function(e)
		{ 
			var ModalWindow = Ti.UI.createWindow
			({
				url:'schedule.js',
				layout: "vertical",
				font: config.DEFAULT_FONT,
				color: config.DEFAULT_FONT_COLOR,
				stopid: e.annotation.stop,
				region: e.annotation.region
			});
			ModalWindow.open(); 
		});
		
		return mapview;
	},

	buildControlBar: function()
	{
				
		var close = Ti.UI.createImageView({
			image:config.HS_ASSETS+'/images/close-icon.jpg',
			top:5,
			left: 5,
			height:(config.DISP_HEIGHT/10)/2,
			width: (config.DISP_HEIGHT/10)/2
		});
		
		close.addEventListener('click', function(e){
			Ti.UI.currentWindow.close();
		});
		
		return close;
	},

	addStops: function(regionid, st, stopid, lat, long)
	{
		var view = Map.createAnnotation({
		    latitude:lat,
		    longitude:long,
		    title:st[0],
		    showInfoWindow: false,
		    image:config.HS_ASSETS+"/images/stopIcon-48.png",
			stop: stopid,
			region: regionid
		});
			
				
		return view;
		
	},
	clean: function()
	{
		this.container = null;
		config = null;
		Draggable = null;
		regionWindow = null;
	}
};
region.init();

