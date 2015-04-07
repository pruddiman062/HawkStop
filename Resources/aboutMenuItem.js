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
		// else if( itemIndex === 1 )
		// {
			// scrollView = this.createSettings();
		// }

		//about
		else if( itemIndex === 1 )
		{
			scrollView = this.createAbout();
		}

		//credits
		else if( itemIndex === 2 )
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
	
	createBasicImage: function( imagePath )
	{
		var imageIcon = Ti.UI.createImageView
		({
			image: ( imagePath ),
			width: "auto",
			height: "auto",
		});
		
		return imageIcon;
	},

	createBasicList: function( title, arrayOfListItems )
	{
		var index;

		var list = Ti.UI.createListSection({});

		var listItems = [];

		var stringToAdd;

		//hopefully dynamically making you a list
		for( index = 0; index < arrayOfListItems.length; index++ )
		{
			stringToAdd = arrayOfListItems[ ( index ) ];

			listItems.push( {properties: 	{ 
												title:stringToAdd,
												font: config.ALTERNATIVE_FONT,
												color: config.DEFAULT_FONT_COLOR,
											} } );
		}

		list.setItems( listItems );

		var totalView = Ti.UI.createView
		({
			height:"auto",
			width:"100%",
			layout: "vertical",
		});

		var headerLabel = this.createBasicLabel( title );

		var listView = Ti.UI.createListView
		({
			width:"100%",
			height:"100%",
			sections: [ list ],
			separatorColor: config.DEFAULT_FONT_COLOR
		});

		listView.addEventListener('itemclick', function( e ) 
		{
			modal.close();
		});

		totalView.add( headerLabel );

		totalView.add( listView );

		return totalView;
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
		
		var image1 = this.createBasicImage( config.HOW_TO_IMAGES[0] );
		var image2 = this.createBasicImage( config.HOW_TO_IMAGES[1] );
		var image3 = this.createBasicImage( config.HOW_TO_IMAGES[2] );

		view1.add( label1 );
		view1.add( image1 );
		view2.add( label2 );
		view2.add( image2 );
		view3.add( label3 );
		view3.add( image3 );

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

		var label1 = this.createBasicLabel( config.ABOUT_TEXT );
		
		var image1 = this.createBasicImage( config.ABOUT_IMAGE );

		view1.add( label1 );
		view1.add( image1 );

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

		view1.add( this.createBasicList( "Project Leads", config.PROJECT_LEADS ) );
		view2.add( this.createBasicList( "Club Officers", config.CLUB_OFFICERS ) );
		view3.add( this.createBasicList( "Supporting Club Members", config.SUPPORTING_CLUB_MEMBERS ) );

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
