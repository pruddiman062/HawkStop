/* File: data.js
 * Organization: Technical Entrepreneurs <Tech-Es>
 * Contributors: 
 * Date: 10/25/2014
 * Desc: This is the data file. It is a CommonJS module. 
 *       It handles the pull, storage, and the push of data.
 * 
 */
var config = require('./config');

function data()
{
	this.data_object = [];
	this.url = config.DATA_URI;
	this.xhr = Ti.Network.createHTTPClient();
	this.localFile = config.LOCAL_XML;
	
	this.parseXML = function(XML)
	{
		Ti.API.info(XML);
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
    				Lat: stops.item(j).getAttribute('latitude'),
    				Long: stops.item(j).getAttribute('longitude')
    			};
				
			}
			data_o[i] = {
    				regionId: items.item(i).getAttribute('id'),
    				stops: stopOBJ,
    				schedule: dataOBJ
    			};
	    		        
	    }
	    return data_o;
	};
	
	this.saveStream = function(XML, URI)
	{
		var file = Ti.Filesystem.getFile(URI);
		file.write(XML, false);
		file = null;
		Ti.App.Properties.xmlDownload = 1;
	};
}

data.prototype.init =  function(callback)
{
	if(!Ti.App.Properties.xmlDownload)
	{
		var localURI = this.localFile;
		this.xhr.hs_save = this.saveStream;
		this.xhr.hs_parse = this.parseXML;
		this.xhr.onload = function() {
			data_o = this.hs_parse(this.responseXML);
			this.hs_save(this.responseXML, localURI);
		    //this.xhr.close();
		    callback(data_o);
		};
		
		this.xhr.onerror = function(e) {
			
			file = Ti.Filesystem.getFile(this.localFile);
			var blob = file.read();
			var readText = blob.text;
			var data_o = this.parseXML(readText);
			callback(data_o);
			// dispose of file handle & blob.
			file = null;
			blob = null;		    

		};
		 
		this.xhr.open('GET',this.url);
		this.xhr.send();
	
	}
	else
	{
		file = Ti.Filesystem.getFile(this.localFile);
		var blob = file.read();
		Ti.API.info(blob);
		var readText = blob.text;
		Ti.API.info(readText);
		var data_o = this.parseXML(readText);
		callback(data_o);
		// dispose of file handle & blob.
		file = null;
		blob = null;
	}
	
	
};

data.prototype.getStops = function(regionid)
{	
	var index = 0;
	for(i = 0; i<this.data_object.length && regionid != this.data_object[i].regionId; i++)
	{
		index = i;
		Ti.API.info(this.data_object[index].regionId);
		Ti.API.info(index);
	}
	if(index == (this.data_object.length-1) && regionid != this.data_object[index].regionId)
	{
		alert("Region not found");
		return null;
	}
	else
	{
		return this.data_object[index].stops;
	}
};
data.prototype.getSchedule = function(regionid,stopid)
{	
	var index = 0;
	for(i = 0; i<this.data_object.length && regionid != this.data_object[i].regionId; i++)
	{
		index = i;
		Ti.API.info(this.data_object[index].regionId);
		Ti.API.info(index);
	}
	if(index == (this.data_object.length-1) && regionid != this.data_object[index].regionId)
	{
		alert("Region not found");
		return null;
	}
	else
	{
		var sIndex = 0;
		for(j = 0; j<this.data_object[index].stops.length && stopid != this.data_object[index].stops[j].Id ; j++);
		{
			sIndex = j;
		}
		return this.data_object[index].schedule;
	}
};

data.prototype.pushLocation = function(latitude, longitude)
{
	//PENDING
};
//OTHER DATA FUNCTIONS PENDING

data.prototype.setData = function(data)
{
	this.data_object = data;
};

data.prototype.clean = function()
{
	this.data_object = null;
	this.xhr = null;
};

module.exports = data;

