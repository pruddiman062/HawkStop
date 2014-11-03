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
	exports.DISP_WIDTH = Ti.Platform.displayCaps.platformWidth;
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
//Remember to tell a programmer if you want to use custom fonts
//because we have to do some fancy shit!
exports.DEFAULT_FONT = 	{ 
							fontStyle: "sans",
							fontSize: "30%", 
							fontWeight: "bold"
						};
exports.ALTERNATIVE_FONT = 	{ 
								fontStyle: "sans-serif",
								fontSize: "20%", 
								fontWeight: "normal"
							};
exports.SCHEDULE_FONT = 	{ 
							fontStyle: "sans",
							fontSize: "20%", 
							fontWeight: "bold"
						};
exports.DEFAULT_FONT_COLOR = "#000000";
exports.ALTERNATIVE_FONT_COLOR = "#000000";

//App Menu Button Settings
exports.MENU_BG_COLOR = ['#EEFFEE','#FFEEEE','#EEEEFF', '#EEEEEE' ];
exports.MENU_BORDER_COLOR = '#000000';
exports.MENU_BORDER_WIDTH = '2px';
exports.MENU_BORDER_RADIUS = '15px';
exports.MENU_BUTTON_WIDTH = "100%";
exports.MENU_BUTTON_HEIGHT = "26%";
exports.MENU_ABOUT_HEIGHT = "12%";
exports.MENU_BUTTON_TOP_MARGIN = "5%";

//App Menu Icon Settings
exports.MENU_BUTTON_ICON_PATH = "/images/menuIcon";
exports.MENU_ICON_SCALE = "15%";
exports.MENU_ICON_INDENT = "65%";

//App Menu Text Settings
exports.MENU_LABEL_INDENT = "15%";

//Shuttle Stop Icon Size
exports.STOP_Y_SIZE = 60;
exports.STOP_X_SIZE = 60;
exports.ICON_SIZE_UNITS = 'px';

//about page settings
exports.ABOUT_HEIGHT = '200%';

//Schedule modal settings
exports.MODAL_HEIGHT = '25%';
exports.MODAL_WIDTH = '85%';
exports.MODAL_BACKGROUND_COLOR = '#FFFFFF';
exports.MODAL_BORDER_RADIUS = '15px';

//Schedule modal Color
exports.TIME_COLOR_1 = "#00FF00";
exports.TIME_COLOR_2 = "#FFFF00";
exports.TIME_COLOR_3 = "#FF0000";
exports.TIME_COLOR_4 = "#000000";

//Data URI
exports.DATA_URI = "http://shuttleapp.patrickruddiman.com/xml.php";
exports.LOCAL_XML = exports.HS_ASSETS+'/feed.xml';

//STRINGS
exports.HOW_TO_TEXT = 	"Hello! Welcome to HawkStop!" +
						"Simply tap the map you want to access," +
						"then tap the stop you want times from.";
exports.PROJECT_LEADS = [ "Design Team: Karly Rust","App Team: Dan Barron","Business Team: Dylan Jann" ];
exports.CLUB_OFFICERS = [ 	"President: Willem Delventhal", "Vice President: Patrick Ruddiman", "Secretary: Chris Wade",
							"Treasurer: Alex Quaglieri", "Social Media Coordinator: Shayna Moran" ];
exports.SUPPORTING_CLUB_MEMBERS = [ "First Last", "First Last", "First Last", "First Last", "First Last", "First Last",
									"First Last", "First Last", "First Last", "First Last", "First Last", "First Last" ];

if(Ti.App.Properties.xmlDownload == undefined)
{	
	Ti.App.Properties.xmlDownload = 0;
	Ti.App.Properties.xmlDownloadTime = 0;
}
