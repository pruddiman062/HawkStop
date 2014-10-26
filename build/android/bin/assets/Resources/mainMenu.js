/* File: mainMenu.js
 * Organization: Technical Entrepreneurs <Tech-Es>
 * Contributors: 
 * Date: 10/25/2014
 * Desc: This is the main menu, it builds the 3 buttons on the main screen and handles the events 
 * requires: lib.config, lib.data;
 */

var config = require('/lib/config');

var mainMenu = {
	//Container for this view
	container: null,
	
	//init function handles building the buttons and displaying the view.
	init: function()
	{	
		this.container = Ti.UI.createView({
			width: config.DISP_WIDTH,
			height: config.DISP_HEIGHT,
			borderColor: "black",
			layout: 'vertical',
		});
		
		this.container.add(this.addButton("Bristol", this.container));
		this.container.add(this.addButton("Campus", this.container));
		this.container.add(this.addButton("Bay Point", this.container));
		
		Ti.UI.currentWindow.add(this.container);
		this.clean();
	},
	
	//creates a button to be added to the view. 
	addButton: function(label, parent)//Returns a view
	{
		var button =  Ti.UI.createButton({
			width: "100%",
			height: (parent.height-100)/3,
			backgroundColor: config.MENU_BG_COLOR,
			borderColor: config.MENU_BORDER_COLOR,
			borderWidth: config.MENU_BORDER_WIDTH,
			borderRadius: config.MENU_BORDER_RADIUS,
			title: label,
			color: config.FONT_COLOR,
			fontSize: config.FONT_SIZE
		});
				
		button.addEventListener('click',function(e){
				
				var win = Ti.UI.createWindow({
					url:'region.js',
					locale: label
				});
				
				win.open();
				//Ti.UI.currentWindow.close();
				
			});
		return button;
	},
	clean: function()
	{
		this.container = null;
		this.buttons = null;
		this.buttons = [];
	}
};
mainMenu.init();