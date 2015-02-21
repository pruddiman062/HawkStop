/* File: region.js
 * Organization: Technical Entrepreneurs <Tech-Es>
 * Contributors: 
 * Date: 10/25/2014
 * Desc: This is the region handler, it builds the display of the custom map based on region clicked. 
 * requires: lib.config, lib.data;
 */
var config = require('/lib/config');
var data = require('/lib/data');
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
	scaleFactor: null,

	init: function()
	{
		this.scaleFactor = 1;

		this.container = Draggable.createView
		({
			borderColor: "black",
			layout: 'composite',
			height: 1178,
			width: 1302,
			top:0,
			left:0
		});

		this.container.draggable.setConfig
		({
		  minLeft: config.DISP_WIDTH-1302,
		  maxLeft: 0,
		  minTop: (config.DISP_HEIGHT-((config.DISP_HEIGHT/10)/2))-1178,
		  maxTop: 0
		});
		
		this.container.add(this.buildMap());
		
		
		var AppData = new data();
		var stops = AppData.getStops(regionid);

		for(i in stops)
		{
			this.addStops(regionid, i, stops[i][1][0], stops[i][1][1]);
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

		//ZOOMING IN AND OUT WOOO!!!
		var zoomInButton = Ti.UI.createImageView
		({
			image:config.HS_ASSETS+'/images/in-icon.png',
			top:5,
			left: 0,
			height:(config.DISP_HEIGHT/10)/2,
			width: (config.DISP_HEIGHT/10)/2
		});
		
		zoomInButton.addEventListener('touchend', function(e)
		{
			region.zoomIn();
		} );

		var zoomOutButton = Ti.UI.createImageView
		({
			image:config.HS_ASSETS+'/images/out-icon.png',
			top:5,
			left: config.DISP_HEIGHT/10,
			height:(config.DISP_HEIGHT/10)/2,
			width: (config.DISP_HEIGHT/10)/2
		});
		
		zoomOutButton.addEventListener('touchend', function(e)
		{
			region.zoomOut();
		});
		
		view.add( close );

		view.add( zoomInButton );

		view.add( zoomOutButton );

		return view;
	},

	zoomIn: function()
	{
		Ti.API.info("Zoom In: I was touched!");
		Ti.API.info(this.scaleFactor + " " + config.MAX_ZOOM_IN);

		if( this.scaleFactor > config.MAX_ZOOM_IN )
		{
			Ti.API.info("Zoom In: I should've zoomed in");
			this.scaleFactor -= config.ZOOM_AMOUNT;
			this.container.width *= (1 + config.ZOOM_AMOUNT);
			this.container.height *= (1 + config.ZOOM_AMOUNT);
		}
	},

	zoomOut: function()
	{
		Ti.API.info("Zoom Out: I was touched!");
		Ti.API.info(this.scaleFactor + " " + config.MAX_ZOOM_IN);

		if( this.scaleFactor < config.MAX_ZOOM_OUT )
		{
			Ti.API.info("Zoom Out: I should've zoomed out");
			this.scaleFactor += config.ZOOM_AMOUNT;
			this.container.width *= (1 - config.ZOOM_AMOUNT);
			this.container.height *= (1 - config.ZOOM_AMOUNT);
		}
	},

	addStops: function(regionid, stopid, x, y)
	{
		
		var view = Ti.UI.createImageView({
			image: config.HS_ASSETS+"/images/stop.png",
			height: config.STOP_Y_SIZE+config.ICON_SIZE_UNITS,
			width: config.STOP_X_SIZE+config.ICON_SIZE_UNITS,
			top: y-(config.STOP_Y_SIZE/2),
			left: x-(config.STOP_X_SIZE/2)
		});
		
		view.addEventListener('click', function()
		{
			var ModalWindow = Ti.UI.createWindow
			({
				url:'schedule.js',
				layout: "vertical",
				font: config.DEFAULT_FONT,
				color: config.DEFAULT_FONT_COLOR,
				stopid: stopid,
				region: regionid
			});
			ModalWindow.open(); 
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

