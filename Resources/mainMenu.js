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
	aboutOpen: false,
	aboutContainer: Ti.UI.createView
		({
			backgroundColor:'#FFFFFF',
			width:"75%",
			height:"100%",
			left:"-75%",
			top:"0px"
		}),
	overlay: null,
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
			layout: 'vertical'
			//top: config.MENU_BUTTON_TOP_MARGIN,
		} );
		
		this.createAboutView();

		this.container.add( this.addMenuBar());

		this.container.add( this.addButton( "Bristol", 0, this.container ));

		this.container.add( this.addButton( "Campus", 1, this.container ));

		this.container.add( this.addButton( "Baypoint", 2, this.container ));
		
		this.container.addEventListener('swipe', function(e) {
		   if (e.direction == 'right') {
		      
		      	if(!mainMenu.aboutOpen)
				{
					var overlayAnimation = Titanium.UI.createAnimation();
					overlayAnimation.left = "0px";
					overlayAnimation.duration = 10;
					var animationHandler = function() {
					  overlayAnimation.removeEventListener('complete',animationHandler);
					  overlayAnimation.opacity = .6;
					  overlayAnimation.duration = 140;
					  mainMenu.overlay.animate(overlayAnimation);
					};
					overlayAnimation.addEventListener('complete',animationHandler);
					mainMenu.overlay.animate(overlayAnimation);
	
					
					var aboutMenuAnimation = Ti.UI.createAnimation();
					aboutMenuAnimation.left = '0px';
					aboutMenuAnimation.duration = 150;
					mainMenu.aboutContainer.animate(aboutMenuAnimation);
					mainMenu.aboutOpen = true;
				}
				
		   }
		});
		
		
		Ti.UI.currentWindow.add( this.container );
		Ti.UI.currentWindow.add(mainMenu.overlay);
		Ti.UI.currentWindow.add(mainMenu.aboutContainer);

		//this.clean();
		
		
	},
	
	//creates a button to be added to the view. 
	addButton: function( buttonText, iconID, parent )//Returns a view
	{
		//start with an empty container
		var container = Ti.UI.createView
		({
			width: config.MENU_BUTTON_WIDTH,
			height: config.MENU_BUTTON_HEIGHT
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
		
		var clickRegion = Ti.UI.createView({
			width: "100%",
			height: "100%"
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

		var imageIcon = Ti.UI.createImageView
		({
			image: ( "" + config.HS_ASSETS + config.MENU_BUTTON_ICON_PATH + iconID + ".png" ),
			width: config.MENU_ICON_SCALE,
			height: "auto",
			left: config.MENU_ICON_INDENT

		});

		clickRegion.addEventListener('click', function(e) 
		{
			var win = Ti.UI.createWindow
			({
				url:'region.js',
				locale: buttonText
			});
			win.open();
		});
		
		container.add( background );

		container.add( label );

		container.add( imageIcon );
		
		container.add( clickRegion );

		return container;
	},

	addMenuBar: function(){
		//start with an empty container
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
			color: "#003660",
			height:"auto",
			width:"auto",
			font: config.DEFAULT_FONT,
			text: "HawkStop",
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			top: "27%"

		});
		
		var aboutButton = Ti.UI.createImageView
		({
			image: ( "" + config.HS_ASSETS + "/images/menu.png" ),
			width: "15%",
			height: "auto",
			left: "1%",
			top: "27%"
		});
		
		container.add( background );

		container.add( label );

		container.add( aboutButton );
		
		mainMenu.overlay = Ti.UI.createView
		({
			width: "100%",
			height: "100%",
			backgroundColor: "#000000",
			opacity: 0,
			top: "0px",
			left: "-100%"
		});
		
		aboutButton.addEventListener( 'click', function( e ) 
		{
			if(!mainMenu.aboutOpen)
			{
				
				var overlayAnimation = Titanium.UI.createAnimation();
				overlayAnimation.left = "0px";
				overlayAnimation.duration = 10;
				var animationHandler = function() {
				  overlayAnimation.removeEventListener('complete',animationHandler);
				  overlayAnimation.opacity = .6;
				  overlayAnimation.duration = 140;
				  mainMenu.overlay.animate(overlayAnimation);
				};
				overlayAnimation.addEventListener('complete',animationHandler);
				mainMenu.overlay.animate(overlayAnimation);

				
				var aboutMenuAnimation = Ti.UI.createAnimation();
				aboutMenuAnimation.left = '0px';
				aboutMenuAnimation.duration = 150;
				mainMenu.aboutContainer.animate(aboutMenuAnimation);
				
				mainMenu.aboutOpen = true;
			}

		});
		
		return container;
	},
	
	createAboutView: function()
	{
		var view = Ti.UI.createView
		({
			width: "100%",
			height: "100%",
			backgroundColor: "#FFFFFF",
			top: "0px",
			left: "0px",
			layout: 'vertical'
		});
		
		var titleView = Ti.UI.createView({
			width:"100%",
			height: "20%",
			backgroundColor:"#98C7E9"
		});
		
		var title = Ti.UI.createLabel
		({
			color: "#003660",
			height:"auto",
			width:"auto",
			font: config.TITLE_FONT,
			color: config.DEFAULT_FONT_COLOR,
			text: "HawkStop",
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			top: "40%"
		});
		
		//MENU ITEM 1:
			var item1 = Ti.UI.createView({
				width: "100%",
				height: "20%"
			});
			
			var settingsImage = Ti.UI.createImageView({
				image: ( "" + config.HS_ASSETS + "/images/settings.png" ),
				height: '55%',
				left:"5%"
			});
			
			var item1Label = Ti.UI.createLabel
			({
				color: "#003660",
				height:"auto",
				width:"auto",
				font: config.ALTERNATIVE_FONT,
				color: config.DEFAULT_FONT_COLOR,
				text: config.DROP_DOWN_MENU_ITEMS[1],
				textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
				top: "40%"
			});
			
			item1.add(settingsImage);
			item1.add(item1Label);
		
		/*
		var list = Ti.UI.createListSection({});

		var listItems = 
		[
			{properties: 	{ 
								title: config.DROP_DOWN_MENU_ITEMS[0],
								font: config.ALTERNATIVE_FONT,
								color: config.DEFAULT_FONT_COLOR
							}},
			// {properties: 	{ 
								// title: config.DROP_DOWN_MENU_ITEMS[1],
								// font: config.ALTERNATIVE_FONT,
								// color: config.DEFAULT_FONT_COLOR
							// }},
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
		*/
		titleView.add(title);
		view.add(titleView);
		view.add(item1);
		mainMenu.aboutContainer.add(view);
		view.addEventListener("swipe", function(e){
			if (e.direction == 'left') {
		     	
		     	if(mainMenu.aboutOpen)
				{
					var overlayAnimation = Titanium.UI.createAnimation();
					overlayAnimation.opacity = 0;
					overlayAnimation.duration = 150;
					
					var animationHandler = function() {
					  overlayAnimation.removeEventListener('complete',animationHandler);
					  overlayAnimation.left = "-100%";
					  overlayAnimation.duration = 0;
					  mainMenu.overlay.animate(overlayAnimation);
					};
					overlayAnimation.addEventListener('complete',animationHandler);
					mainMenu.overlay.animate(overlayAnimation);
					
					
					var aboutMenuAnimation = Ti.UI.createAnimation();
					aboutMenuAnimation.left = '-75%';
					aboutMenuAnimation.duration = 150;
					mainMenu.aboutContainer.animate(aboutMenuAnimation);
					mainMenu.aboutOpen = false;
				}
		     	
		   } 
		});
	},
	
	clean: function()
	{
		this.container = null;
		this.buttons = null;
		this.buttons = [];
	}
};

mainMenu.init();