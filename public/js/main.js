var $ = require('jquery'),
	Modernizr = require('modernizr'),
	HostView = require('./views/host'),
	PhoneView = require('./views/phone');

$(function() {
	// Switch between host and player
	if ( Modernizr.touch ) {
		var phone = new PhoneView();
	} else {
		var host = new HostView();
	}
});
