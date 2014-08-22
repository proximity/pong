var $ = require('jquery'),
	IO = require('./io'),
	Modernizr = require('modernizr'),
	HostView = require('./views/host'),
	PhoneView = require('./views/phone');

$(function() {
	IO.init();

	// Switch between host and player
	if (Modernizr.touch) {
		var phone = new PhoneView();
	} else {
		var host = new HostView();
	}
});
