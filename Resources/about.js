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

var about = {

	
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
