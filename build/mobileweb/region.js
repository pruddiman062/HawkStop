/* File: region.js
 * Organization: Technical Entrepreneurs <Tech-Es>
 * Contributors: 
 * Date: 10/25/2014
 * Desc: This is the region handler, it builds the display of the custom map based on region clicked. 
 * requires: lib.config, lib.data;
 */
var config = require('/lib/config');
var regionWindow = Ti.UI.currentWindow;
var Draggable = require('ti.draggable');

var location = regionWindow.locale;
var imageMap = '';
switch(location)
{
	case 'Campus':
		imageMap = config.HS_ASSETS+'/images/Campus.jpg';
		regionid = 2;
	break;
	
	case 'Bay Point':
		imageMap = config.HS_ASSETS+'/images/Bay_Point.jpg';
		regionid = 3;
	break;
	
	case 'Bristol':
		imageMap = config.HS_ASSETS+'/images/map.jpg';
		regionid = 1;
	break;
}


var region = {
	stops: [],
	container: null,
	init: function(){
		this.container = Draggable.createView({
			borderColor: "black",
			layout: 'composite',
			height: 1178,
			width: 1302,
			top:0,
			left:0
		});
		this.container.draggable.setConfig({
		  minLeft: -1302+config.DISP_WIDTH,
		  maxLeft: 0,
		  minTop: -1178+config.DISP_HEIGHT,
		  maxTop: 0
		});
		
		this.container.add(this.buildMap());
		
		var data = require('/lib/data');
		var AppData = new data();
		var stops = AppData.getStops(regionid);
		for(i = 0; i<stops.length; i++)
		{
			if(stops[i].Long != "" && stops[i].Lat !="")
			{
				this.addStops(regionid, stops[i].Id, stops[i].Lat, stops[i].Long);
			}
		}
		
		regionWindow.add(this.container);
		regionWindow.add(this.buildControlBar());
		//this.clean();
	},
	buildMap: function()
	{
		var mapView = Ti.UI.createImageView({
			image: imageMap,
			height: "100%",
			width: "100%"
		});
		return mapView;
	},
	buildControlBar: function()
	{
		var view = Ti.UI.createView({
			top: (config.DISP_HEIGHT-(config.DISP_HEIGHT/10))-10,
			left:-2,
			height:(config.DISP_HEIGHT/10),
			width: config.DISP_WIDTH+5,
			backgroundColor: '#000000',
			borderColor: '#FFFFFF',
			borderWidth: '2px'
		});
		
		var close = Ti.UI.createImageView({
			image:config.HS_ASSETS+'/images/close-icon.jpg',
			top:5,
			left: config.DISP_WIDTH-((config.DISP_HEIGHT/10)/2),
			height:(config.DISP_HEIGHT/10)/2,
			width: (config.DISP_HEIGHT/10)/2
		});
		
		close.addEventListener('touchend', function(e){
			Ti.UI.currentWindow.close();
		});
		
		view.add(close);
		
		return view;
	},
	addStops: function(regionid, stopid, gpsLat, gpsLong)
	{
		
		var view = Ti.UI.createImageView({
			image: config.HS_ASSETS+"/images/stop.png",
			height: config.STOP_Y_SIZE+config.ICON_SIZE_UNITS,
			width: config.STOP_X_SIZE+config.ICON_SIZE_UNITS,
			top: gpsLong-(config.STOP_Y_SIZE/2),
			left: gpsLat-(config.STOP_X_SIZE/2)
		});
		
		view.addEventListener('click', function(){
			var ModalWindow = Ti.UI.createWindow({
				url:'schedule.js',
				stopid: stopid,
				region: regionid
			});
			ModalWindow.open({modal:true}); 
		});
		this.container.add(view);
		
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

