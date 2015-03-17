/* File: data.js
 * Organization: Technical Entrepreneurs <Tech-Es>
 * Contributors: 
 * Date: 10/25/2014
 * Desc: This is the data file. It is a CommonJS module. 
 *       It handles the pull, storage, and the push of data.
 * Requires: lib.config
 */
var config = require('config');

function data()
{
	this.url = config.DATA_URI;
	this.xhr = Ti.Network.createHTTPClient();
}

var _saveObject = function(json_string)
{
	var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'data.json');
	f.write(json_string);
};

var _readObject = function()
{
	var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'data.json');
	json_string = f.read();
	data_object = JSON.parse(json_string);
	Ti.API.info(json_string);
	return data_object;	
};


data.prototype.init =  function(callback)
{
	if(!Ti.App.Properties.dataObject)
	{
		this.xhr.onload = function() {
			data_o = this.responseText;
			_saveObject(data_o);
		    callback();
		};
		
		this.xhr.onerror = function(e) {   
			callback();
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
	
	Ti.API.info("Region: "+regionid);
	
	Ti.API.info(JSON.stringify(data_object[regionid].NAME));
	Ti.API.info(JSON.stringify(data_object[regionid].STOPS));
	
	return data_object[regionid].STOPS;
	
};
data.prototype.getSchedule = function(regionid,stopid)
{	
	var data_object = _readObject();
	var index = 0;
	
	Ti.API.info("Region: "+regionid+" Stop: "+stopid);
	
	Ti.API.info(JSON.stringify(data_object[regionid].STOPS[stopid][3]));
	
	return data_object[regionid].STOPS[stopid][3];
	
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

