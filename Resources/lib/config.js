/* File: config.js
 * Organization: Technical Entrepreneurs <Tech-Es>
 * Contributors: 
 * Date: 10/25/2014
 * Desc: This is the config file. It is a CommonJS module. 
 *       It handles the globalization of variables.
 * 
 */
/*
 * Colors: 
 * 			Dark Blue:  #003660
 * 			Light Blue: #98C7E9
 * 			Yellow: 	#E0A400 
 */

/*
	Branching logic based on OS
*/
var osname = Ti.Platform.osname;
var os = function(/*Object*/ map) {
	var def = map.def||null; //default function or value
 if (map[osname]) {
 if (typeof map[osname] == 'function') { return map[osname](); }
 else { return map[osname]; }
	}
 else {
 if (typeof def == 'function') { return def(); }
 else { return def; }
	}
};

customFont = os({
			iphone:'Lato',
			ipad: 'Lato',
			ipod: 'Lato',
			android:'Lato-Regular'
	});

//Ti.API.info(customFont);

exports.HS_RESOURCES = ""+Ti.Filesystem.resourcesDirectory;
exports.HS_ASSETS = exports.HS_RESOURCES + 'assets';

exports.DISP_WIDTH;
exports.DISP_HEIGHT;
exports.STOP_ICON;

if((Ti.Platform.osname == 'iphone')||(Ti.Platform.osname == 'ipad'))
{
	exports.DISP_HEIGHT = Ti.Platform.displayCaps.platformHeight;
	exports.DISP_WIDTH = Ti.Platform.displayCaps.platformWidth;
	exports.STOP_ICON = "/images/pin.png";
}
else
{
	exports.DISP_HEIGHT = Ti.Platform.displayCaps.platformHeight*160/Ti.Platform.displayCaps.dpi;
	exports.DISP_WIDTH = Ti.Platform.displayCaps.platformWidth*160/Ti.Platform.displayCaps.dpi;
	exports.STOP_ICON = "/images/pin@2x.png";
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
							fontFamily: customFont,
							fontSize: "30%", 
							fontWeight: "bold"
						};
exports.ALTERNATIVE_FONT = 	{ 
								fontFamily: customFont,
								fontSize: "20%", 
								fontWeight: "normal"
							};
exports.SCHEDULE_FONT = 	{ 
							fontFamily: customFont,
							fontSize: "20%", 
							fontWeight: "bold"
						};
						
exports.TITLE_FONT = 	{ 
	fontFamily: customFont,
	fontSize: "45%", 
	fontWeight: "bold"
};
exports.DEFAULT_FONT_COLOR = "#000000";
exports.ALTERNATIVE_FONT_COLOR = "#000000";


//App Menu General Settings
exports.MENU_FULL_BACK_COLOR = "#FFFFFF";

//App Menu Button Settings
exports.MENU_BG_COLOR = ['#E0A400','#003660','#98C7E9','#FFFFFF' ];
//exports.MENU_BG_COLOR = ['rgba(255,238,238,0)','rgba(238,255,238,0)','rgba(238,238,255,0)','rgba(255,215,0,1)' ];
exports.MENU_BG_OPACITY = [ 1, 1, 1, 1 ];
exports.MENU_BORDER_COLOR = '#000000';
exports.MENU_BORDER_WIDTH = '2px';
exports.MENU_BORDER_RADIUS = '15px';
exports.MENU_BUTTON_WIDTH = "100%";
exports.MENU_BUTTON_HEIGHT = "30%";
exports.MENU_TITLE_HEIGHT = "10%";
exports.MENU_BUTTON_TOP_MARGIN = "0";

//App Menu Icon Settings
exports.MENU_BUTTON_ICON_PATH = "/images/menuIcon";
exports.MENU_ICON_SCALE = "40%";
exports.MENU_ICON_INDENT = "55%";

//App Menu Text Settings
exports.MENU_LABEL_INDENT = "5%";

//Shuttle Stop Icon Size
exports.STOP_Y_SIZE = 60;
exports.STOP_X_SIZE = 60;
exports.ICON_SIZE_UNITS = 'px';

//about page settings
exports.ABOUT_HEIGHT = '30%';
exports.ABOUT_TEXT = "App built by the RWU Technical Entrepreneurs";
exports.ABOUT_IMAGE = "/assets/images/techLogo.png";

//Schedule modal settings
exports.MODAL_HEIGHT = '15%';
exports.MODAL_WIDTH = '100%';
exports.MODAL_BACKGROUND_COLOR = '#FFFFFF';

//Schedule modal Color
exports.TIME_COLOR_1 = "#00FF00";
exports.TIME_COLOR_2 = "#FFFF00";
exports.TIME_COLOR_3 = "#FF0000";
exports.TIME_COLOR_4 = "#000000";

//Data URI
exports.DATA_URI = "http://shuttleapp.patrickruddiman.com/JSON.php";
exports.LOCAL_XML = exports.HS_ASSETS+'/feed.xml';

//STRINGS
exports.DROP_DOWN_MENU_ITEMS = [ "How To Use", "Settings", "About", "Contributors" ];

exports.HOW_TO_TEXT = 	["First, tap the map you want times from",
						"Then, tap the stop you need",
						"The next shuttle and available times that day will be displayed."];
exports.HOW_TO_IMAGES = [
							"/assets/images/howTo1.png",
							"/assets/images/howTo2.png",
							"/assets/images/howTo3.png"
						];

exports.CLUB_OFFICERS = [ 	"President: Willem Delventhal", "Vice President: Patrick Ruddiman", "Secretary: Chris Wade",
							"Treasurer: Alex Quaglieri", "Media Coordinator: Karly Rust" ];
							
exports.SUPPORTING_CLUB_MEMBERS = [ "Alex Di Iorio - Graphic Designer", "David McIvor - Graphic Designer", "David Wood", "Isaac Goldman - Graphic Designer", 
									"Matthew Gallagher - Graphic Designer", "Nicole Vermes - Graphic Designer", "Sean Doyle" ];

if(Ti.App.Properties.xmlDownload == undefined)
{	
	Ti.App.Properties.xmlDownload = 0;
	Ti.App.Properties.xmlDownloadTime = 0;
}
