/* File: mainMenu.js
 * Organization: Technical Entrepreneurs <Tech-Es>
 * Contributors: 
 * Date: 10/25/2014
 * Desc: This is the main menu, it builds the 3 buttons on the main screen and handles the events 
 * requires: lib.config, lib.data;
 */

 /*global require*/

var config = require('/lib/config');

var mainMenu = {
	//Container for this view
	container: null,

	//init function handles building the buttons and displaying the view.
	init: function()
	{	
		this.container = Ti.UI.createView
		({
			width: config.DISP_WIDTH,
			height: config.DISP_HEIGHT,
			borderColor: "black",
			layout: 'vertical',
			top: config.MENU_BUTTON_TOP_MARGIN
		});
		
		this.container.add( this.addButton( "Bristol", 0, this.container ));
		this.container.add( this.addButton( "Campus", 1, this.container ));
		this.container.add( this.addButton( "Bay Point", 2, this.container ));
		
		Ti.UI.currentWindow.add(this.container);
		this.clean();
	},
	
	//creates a button to be added to the view. 
	addButton: function( buttonText, iconID, parent )//Returns a view
	{
		//start with an empty container
		var container = Ti.UI.createView
		({
			width: config.MENU_BUTTON_WIDTH,
			height: config.MENU_BUTTON_HEIGHT,
			backgroundColor: config.MENU_BG_COLOR[ iconID ],
			borderColor: config.MENU_BORDER_COLOR,
			borderWidth: config.MENU_BORDER_WIDTH,
			borderRadius: config.MENU_BORDER_RADIUS,
		});

		//add a label
		var label = Ti.UI.createLabel
		({
			color: config.DEFAULT_FONT_COLOR,
			height:"auto",
			width:"auto",
			font: config.DEFAULT_FONT,
			text: buttonText,
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			left: config.MENU_LABEL_INDENT

		});

		//add an image icon
		var imageIcon = Ti.UI.createImageView
		({
			image: ( "" + config.HS_ASSETS + config.MENU_BUTTON_ICON_PATH + iconID + ".png" ),
			width: config.MENU_ICON_SCALE,
			height: "auto",
			left: config.MENU_ICON_INDENT

		});

		//add a translucent button for clicking
		var button =  Ti.UI.createButton
		({
			width: "100%",
			height: "100%",
			backgroundColor: "transparent"
		});

		container.add( label );

		container.add( imageIcon );

		container.add( button );

		button.addEventListener( 'click', function( e ) 
		{
				
				var win = Ti.UI.createWindow
				({
					url:'region.js',
					locale: buttonText
				});
				
				win.open();
				//Ti.UI.currentWindow.close();
				
		});

		return container;
	},

	clean: function()
	{
		this.container = null;
		this.buttons = null;
		this.buttons = [];
	}
};
mainMenu.init();