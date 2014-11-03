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
		( {
			width: config.DISP_WIDTH,
			height: config.DISP_HEIGHT,
			borderColor: "black",
			layout: 'vertical',
			top: config.MENU_BUTTON_TOP_MARGIN
		} );
		
		this.container.add( this.addButton( "Bristol", 0, config.MENU_BUTTON_HEIGHT, this.container ));

		this.container.add( this.addButton( "Campus", 1, config.MENU_BUTTON_HEIGHT, this.container ));

		this.container.add( this.addButton( "Bay Point", 2, config.MENU_BUTTON_HEIGHT, this.container ));

		this.container.add( this.addButton( "About", 3, config.MENU_ABOUT_HEIGHT, this.container ));
		
		Ti.UI.currentWindow.add( this.container );

		this.clean();
	},
	
	//creates a button to be added to the view. 
	addButton: function( buttonText, iconID, buttonHeight, parent )//Returns a view
	{
		//start with an empty container
		var container = Ti.UI.createView
		({
			width: config.MENU_BUTTON_WIDTH,
			height: buttonHeight,
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
				if( buttonText === "About" )
				{
					var ModalWindow = Ti.UI.createWindow
					({
						url:'about.js',
						backgroundColor: 'transparent',
						opacity: 1.0,
						navBarHidden: true
					});

					ModalWindow.open(); 
				}
				else
				{
					var win = Ti.UI.createWindow
					({
						url:'region.js',
						locale: buttonText
					});
					
					win.open();
				}

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