/* File: aboutMenuItem.js
 * Organization: Technical Entrepreneurs <Tech-Es>
 * Contributors: 
 * Date: 10/28/2014
 * Desc: aboutMenuItem popup, it handles all of the about menu thangs
 * requires: lib.config, lib.data;
 */
 
var modal = Ti.UI.currentWindow;

var config = require('/lib/config');

var itemIndex = modal.itemIndex;

//var Draggable = require('ti.draggable');

var aboutMenuItem = 
{

	init: function()
	{
		var background = Ti.UI.createView
		({
			backgroundColor:'#000000',
			opacity: 0.6
		});

		modal.add( background );

		var scrollView = Ti.UI.createScrollableView({});

		//Deciding what we are making

		//How to menu
		if( itemIndex === 0 )
		{
			scrollView = this.createHowTo();
		}

		//settings
		else if( itemIndex === 1 )
		{
			scrollView = this.createSettings();
		}

		//about
		else if( itemIndex === 2 )
		{
			scrollView = this.createAbout();
		}

		//credits
		else if( itemIndex === 3 )
		{
			scrollView = this.createCredits();
		}

		scrollView.addEventListener('click',function()
		{
			modal.close();
		});

		//setting it up
		modal.add( scrollView );
	},

	createBasicView:function()
	{
		var tempView = Ti.UI.createView
		({
			height: "90%",
			width: "90%",
			backgroundColor: config.MODAL_BACKGROUND_COLOR,
			borderRadius: config.MODAL_BORDER_RADIUS,
			layout: "vertical"
		});

		return tempView;
	},

	createBasicLabel:function( text )
	{
		var tempLabel = Ti.UI.createLabel
		({
			color: config.DEFAULT_FONT_COLOR,
			height:"auto",
			width:"auto",
			font: config.DEFAULT_FONT,
			text: text,
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			left: config.MENU_LABEL_INDENT
		});

		return tempLabel;
	},

	createHowTo: function()
	{
		//regular views
		var view1 = this.createBasicView();
		var view2 = this.createBasicView();
		var view3 = this.createBasicView();

		var label1 = this.createBasicLabel( config.HOW_TO_TEXT[0] );
		var label2 = this.createBasicLabel( config.HOW_TO_TEXT[1] );
		var label3 = this.createBasicLabel( config.HOW_TO_TEXT[2] );

		view1.add( label1 );
		view2.add( label2 );
		view3.add( label3 );

		//Scrollable view
		var scrollView = Ti.UI.createScrollableView
		({
			views:[view1, view2, view3],
			showPagingControl:true,
		});

		return scrollView;
	},

	createSettings: function()
	{
		//regular views
		var view1 = this.createBasicView();

		var label1 = this.createBasicLabel( "This is where various settings might go!" );

		view1.add( label1 );

		//Scrollable view
		var scrollView = Ti.UI.createScrollableView
		({
			views:[view1],
			showPagingControl:false,
		});

		return scrollView;
	},

	createAbout: function()
	{
		//regular views
		var view1 = this.createBasicView();

		var label1 = this.createBasicLabel( "App built by RWU Technical Entrepreneurs (Tech-Es)" );

		view1.add( label1 );

		//Scrollable view
		var scrollView = Ti.UI.createScrollableView
		({
			views:[view1],
			showPagingControl:false,
		});

		return scrollView;
	},

	createCredits: function()
	{
		//regular views
		var view1 = this.createBasicView();
		var view2 = this.createBasicView();
		var view3 = this.createBasicView();

		//Project Leads
		var stringToReturn = "";
		stringToReturn += "\n- Project Leads -\n";

		for( index = 0; index < config.PROJECT_LEADS.length; index++ )
		{
			stringToReturn += config.PROJECT_LEADS[index] + "\n";
		}

		var label1 = this.createBasicLabel( stringToReturn );

		//Club Officers
		stringToReturn = "";
		stringToReturn += "\n- Club Officers -\n";

		for( index = 0; index < config.CLUB_OFFICERS.length; index++ )
		{
			stringToReturn += config.CLUB_OFFICERS[index] + "\n";
		}

		var label2 = this.createBasicLabel( stringToReturn );

		//Collaborators
		stringToReturn = "";
		stringToReturn += "\n- Supporting Club Members -\n";

		for( index = 0; index < config.SUPPORTING_CLUB_MEMBERS.length; index++ )
		{
			stringToReturn += config.SUPPORTING_CLUB_MEMBERS[index] + "\n";
		}

		var label3 = this.createBasicLabel( stringToReturn );

		view1.add( label1 );
		view2.add( label2 );
		view3.add( label3 );

		//Scrollable view
		var scrollView = Ti.UI.createScrollableView
		({
			views:[view1, view2, view3],
			showPagingControl:true,
		});

		return scrollView;
	}
};
aboutMenuItem.init();
