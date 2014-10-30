/* File: shuttleStop.js
 * Organization: Technical Entrepreneurs <Tech-Es>
 * Contributors: 
 * Date: 10/25/2014
 * Desc: This is the shuttleStop Module. It is a CommonJS module. 
 *       It handles the schedule for each stop. Its an Object of sorts.
 */

 var config = require('/lib/config');
 var modal = Ti.UI.currentWindow;
 var stopid = modal.stopid;
 
 function ShuttleStop()
 {
 	this.regionID;
 	this.stopID = stopid;
 	
 	
 }
