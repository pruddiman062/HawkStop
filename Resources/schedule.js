/* File: schedule.js
 * Organization: Technical Entrepreneurs <Tech-Es>
 * Contributors: 
 * Date: 10/28/2014
 * Desc: schedule popup, it handles the popup for upcoming stop times.
 * requires: lib.config, lib.data;
 */
 
var modal = Ti.UI.currentWindow;
var stopid = modal.stopid;
var regionid = modal.region;
 
var data = require('/lib/data');
var AppData = new data();

var config = require('/lib/config');

var schedule = {
	stopId: stopid,
	regionId: regionid,
	data: {},
	init: function(){
		this.data = AppData.getSchedule(this.regionId,this.stopId);
		Ti.API.info(JSON.stringify(this.data));
		
		var view = Ti.UI.createView
		({
			top: 0,
			left: 0,
			height: config.MODAL_HEIGHT,
			width: config.MODAL_WIDTH,
			backgroundColor: config.MODAL_BACKGROUND_COLOR
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
		
		
		var currentStop = this.getSchedule();
		
		
		var color = "";
		if(currentStop[0] == -1)
		{
			color = config.TIME_COLOR_4;
		}
		if(currentStop[0] > 6)
		{
			currColor = config.TIME_COLOR_1;
		}
		else
		{
			if(currentStop[0] < 3)
			{
				currColor = config.TIME_COLOR_3;
			}
			else
			{
				currColor = config.TIME_COLOR_2;
			}
		}
		
		if(currentStop[0] != -1)
		{
			var label0 = Ti.UI.createLabel
			({
				top:5,
				text:"The shuttle arrives in:",
				color: config.TIME_COLOR_4,
				height:"auto",
				width:"auto",
				font: config.SCHEDULE_FONT,
				textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
			});
			
			var label1 = Ti.UI.createLabel
			({
				top:25,
				text:schedule[0]+" minutes",
				color: currColor,
				height:"auto",
				width:"auto",
				font: config.DEFAULT_FONT,
				textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
			});
			view.add(label0);
			view.add(label1);
		}
		else
		{
			var label0 = Ti.UI.createLabel
			({
				top:5,
				text:"There are no scheduled arrivals remaining.",
				color: config.TIME_COLOR_4,
				height:"auto",
				width:"auto",
				font: config.SCHEDULE_FONT,
				textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
			});
			view.add(label0);
		}
		
		view.add(close);
		var lView = this.getListOfStops(currentStop[1]);
		modal.add(view);
		modal.add(lView);
	},
	getSchedule: function()
	{
		var ETA = -1;
		var arrival;
		var index = 0;
		var timeNow = new Date();
		var schedule = this.data;
		
		
		for( time in schedule)
		{	
			var stopTime = this.parseTime(schedule[time][0]);
			if(timeNow>stopTime)
			{
				continue;
			}
			else
			{
				arrival = stopTime;
				ETA = Math.round(((stopTime.getTime() - timeNow.getTime())/1000)/60);
				index = time;
				break;
			}
		}
		
		return [ETA, index, arrival];
		
		
	},
	getListOfStops: function(index){
		var schedule = this.data;
		var listView = Ti.UI.createListView({
				backgroundColor: config.MODAL_BACKGROUND_COLOR,
				separatorColor: config.DEFAULT_FONT_COLOR
			});
		var sections = [];
		var dataset = [];
		var stopSection = Ti.UI.createListSection({
				headerTitle: 'Remaining Schedule'
			});
		
		for(time in schedule)
		{
			dataset.push({properties: 
					{ 
					title: this.parseTime(schedule[time][0].split(" ")[0]),
					font: config.ALTERNATIVE_FONT,
					color: config.DEFAULT_FONT_COLOR,
					height: "20px"
					}
			});
		}
		
		stopSection.setItems(dataset);
		sections.push(stopSection);
		listView.sections = sections;
		return listView;
	},
	parseTime: function(timeStr, dt)
	{
	    if (!dt) {
	        dt = new Date();
	    }
	 
	    var time = timeStr.match(/(\d+)(?::(\d\d))?\s*(p?)/i);
	    if (!time) {
	        return NaN;
	    }
	    var hours = parseInt(time[1], 10);
	    if (hours == 12 && !time[3]) {
	        hours = 0;
	    }
	    else {
	        hours += (hours < 12 && time[3]) ? 12 : 0;
	    }
	 
	    dt.setHours(hours);
	    dt.setMinutes(parseInt(time[2], 10) || 0);
	    dt.setSeconds(0, 0);
	    return dt;
	}
};
schedule.init();
