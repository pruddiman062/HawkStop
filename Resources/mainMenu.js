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
	aboutButton: Ti.UI.createImageView
		({
			image: ( "" + config.HS_ASSETS + "/images/icon-arrow-down.png" ),
			width: "15%",
			height: "auto",
			left: "1%",
			top: "50%"
		}),
	aboutContainer: Ti.UI.createView
		({
			backgroundColor:'#FFFFFF',
			width:"50%",
			height:"100%",
			left:"1px",
			top:"10.5%"
		}),
	//init function handles building the buttons and displaying the view.
	init: function()
	{	
		var background = Ti.UI.createView
		({
			backgroundColor: config.MENU_FULL_BACK_COLOR
		});

		Ti.UI.currentWindow.add( background );

		this.container = Ti.UI.createView
		( {
			width: config.DISP_WIDTH,
			height: config.DISP_HEIGHT,
			borderColor: "black",
			layout: 'vertical',
			//top: config.MENU_BUTTON_TOP_MARGIN,
		} );
		
		this.container.add( this.addMenuBar());

		this.container.add( this.addButton( "Bristol", 0, config.MENU_BUTTON_HEIGHT, this.container ));

		this.container.add( this.addButton( "Campus", 1, config.MENU_BUTTON_HEIGHT, this.container ));

		this.container.add( this.addButton( "Bay Point", 2, config.MENU_BUTTON_HEIGHT, this.container ));
		
		Ti.UI.currentWindow.add( this.container );

		//this.clean();
	},
	
	//creates a button to be added to the view. 
	addButton: function( buttonText, iconID, buttonHeight, parent )//Returns a view
	{
		//start with an empty container
		var container = Ti.UI.createView
		({
			width: config.MENU_BUTTON_WIDTH,
			height: buttonHeight,

		});

		var background = Ti.UI.createView
		({
			width: "100%",
			height: "100%",
			backgroundColor: config.MENU_BG_COLOR[ iconID ],
			opacity: config.MENU_BG_OPACITY[ iconID ]
			// borderColor: config.MENU_BORDER_COLOR,
			// borderWidth: config.MENU_BORDER_WIDTH,
			// borderRadius: config.MENU_BORDER_RADIUS,
		});

		//add a label
		var label = Ti.UI.createLabel
		({
			color: "#FFFFFF",
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

		container.add( background );

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

	addMenuBar: function(){
		//start with an empty container
		this.createAboutView();
		var container = Ti.UI.createView
		({
			width: config.MENU_BUTTON_WIDTH,
			height: config.MENU_TITLE_HEIGHT
		});
		
		var background = Ti.UI.createView
		({
			width: "100%",
			height: "100%",
			backgroundColor: config.MENU_BG_COLOR[ 3 ],
			opacity: config.MENU_BG_OPACITY[ 3 ]
		});
		
		//add a label
		var label = Ti.UI.createLabel
		({
			color: "#000000",
			height:"auto",
			width:"auto",
			font: config.DEFAULT_FONT,
			text: "HawkStop",
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			left: "30%"

		});
		
		container.add( background );

		container.add( label );

		container.add( this.aboutButton );
		
		this.aboutButton.addEventListener( 'click', function( e ) 
		{
			if(this.image == ( "" + config.HS_ASSETS + "/images/icon-arrow-down.png" ))
			{
				Ti.UI.currentWindow.add(mainMenu.aboutContainer);
				this.image = ( "" + config.HS_ASSETS + "/images/icon-arrow-up.png" );		
			}
			else
			{
				Ti.UI.currentWindow.remove(mainMenu.aboutContainer);
				this.image = ( "" + config.HS_ASSETS + "/images/icon-arrow-down.png" );		
			}

		});
		
		return container;
	},
	
	createAboutView: function()
	{
		var list = Ti.UI.createListSection({});

		var listItems = 
		[
			{properties: 	{ 
								title: config.DROP_DOWN_MENU_ITEMS[0],
								font: config.ALTERNATIVE_FONT,
								color: config.DEFAULT_FONT_COLOR
							}},
			{properties: 	{ 
								title: config.DROP_DOWN_MENU_ITEMS[1],
								font: config.ALTERNATIVE_FONT,
								color: config.DEFAULT_FONT_COLOR
							}},
			{properties: 	{ 
								title: config.DROP_DOWN_MENU_ITEMS[2],
								font: config.ALTERNATIVE_FONT,
								color: config.DEFAULT_FONT_COLOR
							}},
			{properties: 	{ 
								title: config.DROP_DOWN_MENU_ITEMS[3],
								font: config.ALTERNATIVE_FONT,
								color: config.DEFAULT_FONT_COLOR
							}}
		];

		list.setItems( listItems );


		var listView = Ti.UI.createListView
		({
			width:"100%",
			height:"90%",
			sections: [ list ],
			backgroundColor: config.MODAL_BACKGROUND_COLOR,
			separatorColor: config.DEFAULT_FONT_COLOR
		});
		
		listView.addEventListener('itemclick', function( e ) 
		{
			var win = Ti.UI.createWindow
			({
				url:'aboutMenuItem.js',
				itemIndex: e.itemIndex,
			});
			
			win.open();

			//modal.close();
		});

				
		this.aboutContainer.add(listView);
	},
	
	clean: function()
	{
		this.container = null;
		this.buttons = null;
		this.buttons = [];
	}
};

mainMenu.init();