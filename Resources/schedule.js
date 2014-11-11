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
		
		var mView = Ti.UI.createView
		({
			backgroundColor:'#000000',
			opacity: .6
		});
		
		var view = Ti.UI.createView
		({
			height: config.MODAL_HEIGHT,
			width: config.MODAL_WIDTH,
			backgroundColor: config.MODAL_BACKGROUND_COLOR,
			borderRadius: config.MODAL_BORDER_RADIUS,
			layout: "vertical"
		});
		
		view.addEventListener('click',function()
		{
			modal.close();
		});
		
		var schedule = this.getSchedule();
		
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
				text:"The shuttle arrives in:",
				color: config.TIME_COLOR_4,
				height:"auto",
				width:"auto",
				font: config.SCHEDULE_FONT,
				textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
			});
			
			var label1 = Ti.UI.createLabel
			({
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
		var label2 = Ti.UI.createLabel
		({
			text:"The following shuttle arrives at: "+schedule[1],
			color: config.TIME_COLOR_4,
			height:"auto",
			width:"auto",
			font: config.SCHEDULE_FONT,
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
		});

		view.add(label2);
		modal.add(mView);
		modal.add(view);
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
					ETA = (sMinutes-curMinutes);
					NextStop = schedule[(i+1)].time;
					last = false;
					break;
				}
			}
			if(sHour == curHours+1)
			{
				ETA = (parseInt(sMinutes)+(60-curMinutes));
				if(i+1 == schedule.length)
				{
					NextStop = schedule[0].time;	
				}
				else
				{
					NextStop = schedule[(i+1)].time;
				}
				last = false;
				break;
			}
		}
		
		tSplit = NextStop.split(':');
		
		var hour = tSplit[0];
		var minute = tSplit[1];
		var suffix;
		
		if(hour > 12)
		{
			hour = hour-12;
			suffix = "PM";
		}
		else
		{
			if(hour = 12)
			{
				suffix = "PM";
			}
			suffix = "AM";
		}
		
		if(last)
		{
			NextStop = schedule[0].time + " AM";
		}
		else
		{
			NextStop = hour+":"+minute+" "+suffix;
		}
		
		return [ETA, NextStop, last];
		
		
	}
};
schedule.init();
