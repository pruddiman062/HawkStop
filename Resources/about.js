/* File: about.js
 * Organization: Technical Entrepreneurs <Tech-Es>
 * Contributors: 
 * Date: 10/28/2014
 * Desc: about popup, it handles the popup for our about page
 * requires: lib.config, lib.data;
 */
 
var modal = Ti.UI.currentWindow;

var config = require('/lib/config');

//var Draggable = require('ti.draggable');

var about = 
{

	init: function()
	{
		var background = Ti.UI.createView
		({
			backgroundColor:'#000000',
			opacity: 0.6,
		});

		var list = Ti.UI.createListSection({});

		var listItems = 
		[
			{properties: 	{ 
								title: config.DROP_DOWN_MENU_ITEMS[0],
								font: config.ALTERNATIVE_FONT,
							}},
			{properties: 	{ 
								title: config.DROP_DOWN_MENU_ITEMS[1],
								font: config.ALTERNATIVE_FONT,
							}},
			{properties: 	{ 
								title: config.DROP_DOWN_MENU_ITEMS[2],
								font: config.ALTERNATIVE_FONT,
							}},
			{properties: 	{ 
								title: config.DROP_DOWN_MENU_ITEMS[3],
								font: config.ALTERNATIVE_FONT,
							}},
		];

		list.setItems( listItems );

		var listView = Ti.UI.createListView
		({
			width:"45%",
			height:"40%",
			top: config.MENU_BUTTON_TOP_MARGIN,
			left: "0%",
			sections: [ list ],
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

		background.addEventListener('click',function()
		{
			modal.close();
		});

		modal.add( background );

		modal.add( listView );

	},

	//returns the width of a string in pixels
	//to be used to know how big a string will be on the screen
	getStringPixelLength: function( string, font )
	{
		var tempString = Ti.UI.createLabel
		({
			text: string,
			font: font,
		});

		Ti.API.info( "widthWord:" + tempString.getWidth() );

		return tempString.getWidth();
	},

	//does the same as getStringPixelLength but only returns
	//the length of the longest one
	getLongestString: function( arrayOfStrings, font )
	{
		var largestWidth = 0;
		var testWidth;
		var index;

		for( index = 0; index < arrayOfStrings.length; index++ )
		{
			testWidth = this.getStringPixelLength( arrayOfStrings[index], font );

			if( testWidth > largestWidth )
			{
				largestWidth = testWidth;
			}
		}

		return largestWidth;
	}
};
about.init();
