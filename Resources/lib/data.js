/* File: data.js
 * Organization: Technical Entrepreneurs <Tech-Es>
 * Contributors: 
 * Date: 10/25/2014
 * Desc: This is the data file. It is a CommonJS module. 
 *       It handles the pull, storage, and the push of data.
 * Requires: lib.config
 */
var config = require('./config');

function data()
{
	this.url = config.DATA_URI;
	this.xhr = Ti.Network.createHTTPClient();
}

var _saveObject = function(data_object)
{
	var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'data.json');
	json_string = JSON.stringify(data_object);
	f.write(json_string); // write to the file
	Ti.App.Properties.dataObject = 1;
};

var _readObject = function()
{
	var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'data.json');
	json_string = f.read();
	data_object = JSON.parse(f.read());
	
	return data_object;	
};

data.parseXML = function(XML)
{
	var doc = XML.documentElement;
	var data_o = [];
    var items = doc.getElementsByTagName("region");
    for (var i=0; i<items.length; i++) 
    {
		var stops = items.item(i).getElementsByTagName("stop");
		var stopOBJ = [];
		for(var j=0; j<stops.length; j++)
		{
			var schedules = stops.item(j).getElementsByTagName("schedule");
			var dataOBJ = [];
			
			for(var k=0; k<schedules.length; k++)
			{
				dataOBJ[k] = {
					id: schedules.item(k).getAttribute('id'),
					spDate: schedules.item(k).getAttribute('specialDate'), 
					time: schedules.item(k).textContent
				};
			}
			
			stopOBJ[j] = {
				Id:	stops.item(j).getAttribute('id'),
				Name: stops.item(j).getAttribute('name'),
				x: stops.item(j).getAttribute('x'),
				y: stops.item(j).getAttribute('y'),
				Lat: stops.item(j).getAttribute('latitude'),
				Long: stops.item(j).getAttribute('longitude'),
				schedule:dataOBJ
			};
			
		}
		data_o[i] = {
				regionId: items.item(i).getAttribute('id'),
				stops: stopOBJ,
			};
    		        
    }
    return data_o;
};


data.prototype.init =  function(callback)
{
	if(!Ti.App.Properties.dataObject)
	{
		this.xhr.onload = function() {
			data_o = data.parseXML(this.responseXML);
			_saveObject(data_o);
		    callback();
		};
		
		this.xhr.onerror = function(e) {   

		};
		 
		this.xhr.open('GET',this.url);
		this.xhr.send();
	}
	else
	{
		callback();	
	}
};

data.prototype.getStops = function(regionid)
{	
	var data_object = _readObject();
	var index = 0;
	for(i = 0; i<data_object.length && regionid != data_object[i].regionId; i++)
	{
		index = i;
	}
	if(index == (data_object.length-1) && regionid != data_object[index].regionId)
	{
		alert("Region not found");
		return null;
	}
	else
	{
		return data_object[index].stops;
	}
};
data.prototype.getSchedule = function(regionid,stopid)
{	
	var data_object = _readObject();
	var index = 0;
	for(i = 0; i<data_object.length && regionid != data_object[i].regionId; i++)
	{
		index = i;
	}
	if(index == (data_object.length-1) && regionid != data_object[index].regionId)
	{
		alert("Region not found");
		return null;
	}
	else
	{
		var sIndex = 0;
		
		for(var N = 0; N < data_object[index].stops.length; N++)
		{
			if(stopid == data_object[index].stops[N].Id)
			{
				return data_object[index].stops[N].schedule;
			}
		}
		alert("Schedule not found");
		return null;
		
	}
};

data.prototype.pushLocation = function(latitude, longitude)
{
	//PENDING
};
//OTHER DATA FUNCTIONS PENDING

data.prototype.clean = function()
{
	this.xhr = null;
};

module.exports = data;

