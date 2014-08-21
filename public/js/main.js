var $ = require('jquery'),
	Backbone = require('backbone'),
	Modernizr = require('modernizr'),
	HostView = require('host'),
	PhoneView = require('phone');

$(function() {
	// Switch between host and player
	if ( Modernizr.touch ) {
		var phone = new PhoneView();
	} else {
		var host = new HostView();
	}
});
