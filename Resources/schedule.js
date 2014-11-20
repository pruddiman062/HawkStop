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
	init: function(){
			
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
		
		var schedule = this.getSchedule();
		
		Ti.API.info(schedule[2]);
		
		currColor = "";
		if(schedule[0] > 6 && !schedule[2])
		{
			currColor = config.TIME_COLOR_1;
		}
		else
		{
			if(schedule[0] < 3 || schedule[2])
			{
				currColor = config.TIME_COLOR_3;
			}
			else
			{
				currColor = config.TIME_COLOR_2;
			}
		}
		
		if(!schedule[2])
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
		view.add(close);
		var lView = this.getListOfStops(schedule[1]);
		modal.add(view);
		modal.add(lView);
	},
	getSchedule: function()
	{
		var ETA = 60;
		var NextStop = '';
		var d = new Date();
		var curHours = d.getHours();
		var curMinutes = d.getMinutes();
		var sHour;
		var sMinutes;
		var time;
		var tSplit;
		var last = true;
		var stopIndex;
		
		var schedule = AppData.getSchedule(this.regionId,this.stopId);
		
		for(i = 0; i<schedule.length; i++)
		{
			time = schedule[i].time;
			tSplit = time.split(':');
			
			sHour = (tSplit[0]);
			sMinutes = (tSplit[1]);
			
			if(sHour == curHours)
			{
				if(sMinutes >= curMinutes)
				{
					ETA = (parseInt(sMinutes)-curMinutes);
					stopIndex = i;
					last = false;
					break;
				}
			}
			if(sHour == curHours+1)
			{
				ETA = (parseInt(sMinutes)+(60-curMinutes));
				stopIndex = i;
				last = false;
				break;
			}
		}
		
		return [ETA, stopIndex, last];
		
		
	},
	getListOfStops: function(index){
		var schedule = AppData.getSchedule(this.regionId,this.stopId);
		var listView = Ti.UI.createListView({
				backgroundColor: "dark blue"
			});
		var sections = [];
		var dataset = [];
		var stopSection = Ti.UI.createListSection({
				headerTitle: 'Remaining Schedule'
			});
		
		for(i = (index+1); i<schedule.length; i++)
		{
			
			var time = schedule[i].time;
			var tSplit = time.split(':');
			
			var sHour = (tSplit[0]);
			var sMinutes = (tSplit[1]);
			
			
			if(sHour > 12)
			{
				time = (parseInt(sHour)-12)+":"+sMinutes+" PM";
			}
			else
			{
				time = sHour+":"+sMinutes+" AM";
			}
			
			dataset.push({properties: { title: time}});
		}
		
			stopSection.setItems(dataset);
			sections.push(stopSection);
			listView.sections = sections;
			return listView;
	}
};
schedule.init();
