/* File: app.js
 * Organization: Technical Entrepreneurs <Tech-Es>
 * Contributors: 
 * Date: 10/25/2014
 * Desc: This is the "MAIN" file of the application. this is what is run when the application is opened.
 *       It handles the organization of the code all includes should be done here. 
 * requires: 
 * 			
 */

//var config = require('/lib/config');
//require(HS_INCLUDES+'/data.js');
//require(HS_INCLUDES+'/login.js');



var rootWindow = Ti.UI.createWindow({
	url:'mainMenu.js'
});

rootWindow.open();


//for Later
/*
var data = require('/lib/data');


var AppData = new data();
var stops;
AppData.init(function(data){
	AppData.setData(data);
	stops = AppData.getStops(1);
	for(i = 0; i<stops.length; i++)
	{
		Ti.API.info(stops[i].Name);	
	}
	
});

*/
