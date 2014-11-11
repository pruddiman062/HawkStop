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
			opacity: 0.6
		});

		var mainBody = Ti.UI.createView
		({
			top: config.MENU_BUTTON_TOP_MARGIN,
			height: config.ABOUT_HEIGHT,
			width: config.MODAL_WIDTH,
			backgroundColor: config.MODAL_BACKGROUND_COLOR,
			borderRadius: config.MODAL_BORDER_RADIUS,
			layout: "vertical"
		});

		var testHeader = Ti.UI.createView
		({
			top: "5%",
			height:"30%",
			width:"100%",
			backgroundColor: "#AAFFAA",
			layout: "vertical"
		});

		var testLabel = Ti.UI.createLabel
		({
			top: "5%",
			text: "This is a test",
			height:"auto",
			width:"auto",
			font: config.ALTERNATIVE_FONT,
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
		}); 



		// var scrollableView = Ti.UI.createScrollableView
		// ({
		// 	views: [ mainBody ],
		// 	layout: "vertical",
		// 	scrollingEnabled: true,
		// });

		var list = Ti.UI.createListSection({});

		var listItems = 
		[
			{properties: { title: 'test1'}},
			{properties: { title: 'test2'}},
			{properties: { title: 'test3'}},
			{properties: { title: 'test1'}},
			{properties: { title: 'test2'}},
			{properties: { title: 'test3'}},
			{properties: { title: 'test1'}},
			{properties: { title: 'test2'}},
			{properties: { title: 'test3'}},
			{properties: { title: 'test1'}},
			{properties: { title: 'test2'}},
			{properties: { title: 'test3'}},
			{properties: { title: 'test1'}},
			{properties: { title: 'test2'}},
			{properties: { title: 'test3'}},
			{properties: { title: 'test1'}},
			{properties: { title: 'test2'}},
			{properties: { title: 'test3'}},
			{properties: { title: 'test1'}},
			{properties: { title: 'test2'}},
			{properties: { title: 'test3'}},
		];

		list.setItems( listItems );

		var listView = Ti.UI.createListView
		({
			headerView: mainBody,
			sections: [ list ],
		});

		// mainBody.draggable.setConfig
		// ({
		//   minLeft: "25%", //( "0%" + ( 105 - config.MODAL_WIDTH ) ),
		//   maxLeft: "25%", //( "0%" + ( 105 - config.MODAL_WIDTH ) ),
		//   //minTop: config.DISP_HEIGHT * config.ABOUT_HEIGHT,
		//   maxTop: "15%"
		// });
		
		mainBody.addEventListener('click',function()
		{
			modal.close();
		});

		var howToText = Ti.UI.createLabel
		({
			top: config.MENU_BUTTON_TOP_MARGIN,
			text: config.HOW_TO_TEXT,
			color: config.DEFAULT_FONT_COLOR,
			height:"auto",
			width:"auto",
			font: config.ALTERNATIVE_FONT,
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
		});

		var contributorsTextString = this.getContributorsTextString();

		var contributorsText = Ti.UI.createLabel
		({
			top: config.MENU_BUTTON_TOP_MARGIN,
			text: contributorsTextString,
			color: config.DEFAULT_FONT_COLOR,
			height:"auto",
			width:"auto",
			font: config.ALTERNATIVE_FONT,
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
		});

		mainBody.add( howToText );

		mainBody.add( contributorsText );

		modal.add( background );

		// modal.add( mainBody );

		modal.add( listView );

	},

	getContributorsTextString: function()
	{
		var index;
		var stringToReturn = "- App built by -\n- RWU Technical Entrepreneurs -\n- (Tech-Es) -\n";

		stringToReturn += "\n- Collaborators -\n";


		//Project Leads
		stringToReturn += "\n- Project Leads -\n";

		for( index = 0; index < config.PROJECT_LEADS.length; index++ )
		{
			stringToReturn += config.PROJECT_LEADS[index] + "\n";
		}

		//Club Officers
		stringToReturn += "\n- Club Officers -\n";

		for( index = 0; index < config.CLUB_OFFICERS.length; index++ )
		{
			stringToReturn += config.CLUB_OFFICERS[index] + "\n";
		}

		//Collaborators
		stringToReturn += "\n- Supporting Club Members -\n";

		for( index = 0; index < config.SUPPORTING_CLUB_MEMBERS.length; index++ )
		{
			stringToReturn += config.SUPPORTING_CLUB_MEMBERS[index] + "\n";
		}

		return stringToReturn;
	}
};
about.init();
