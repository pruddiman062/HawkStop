/* File: config.js
 * Organization: Technical Entrepreneurs <Tech-Es>
 * Contributors: 
 * Date: 10/25/2014
 * Desc: This is the config file. It is a CommonJS module. 
 *       It handles the globalization of variables.
 * 
 */

exports.HS_RESOURCES = ""+Ti.Filesystem.resourcesDirectory;
exports.HS_ASSETS = exports.HS_RESOURCES + 'assets';

exports.DISP_WIDTH;
exports.DISP_HEIGHT;

if((Ti.Platform.osname == 'iphone')||(Ti.Platform.osname == 'ipad'))
{
	exports.DISP_HEIGHT = Ti.Platform.displayCaps.platformHeight;
	DISP_WIDTH = Ti.Platform.displayCaps.platformWidth;
}
else
{
	exports.DISP_HEIGHT = Ti.Platform.displayCaps.platformHeight*160/Ti.Platform.displayCaps.dpi;
	exports.DISP_WIDTH = Ti.Platform.displayCaps.platformWidth*160/Ti.Platform.displayCaps.dpi;
}
if(Ti.Platform.osname == 'mobileweb')
{
	exports.DISP_HEIGHT = 16*(50);
	exports.DISP_WIDTH = 9*(50);
}


//App Font Settings
exports.FONT_COLOR = "#000000";
exports.FONT_SIZE = "35px";
exports.FONT_SHADOW_COLOR = "#000000";
exports.FONT_SHADOW_OFFSETx = 2;
exports.FONT_SHADOW_OFFSETy = 2;


//App Menu Button Settings
exports.MENU_BG_COLOR = '#FFFFFF';
exports.MENU_BORDER_COLOR = '#000000';
exports.MENU_BORDER_WIDTH = '2px';
exports.MENU_BORDER_RADIUS = '15px';

//Shuttle Stop Dim
exports.STOP_X_SIZE = 25;
exports.STOP_Y_SIZE = 25;

//Data URI
exports.DATA_URI = "http://shuttleapp.patrickruddiman.com/xml.php";
exports.LOCAL_XML = exports.HS_ASSETS+'/feed.xml';

if(Ti.App.Properties.xmlDownload == undefined)
{
	Ti.App.Properties.xmlDownload = 0;
}

exports.MAP_POINTS = {
	
};
