var $ = require('jquery'),
	Modernizr = require('modernizr'),
	HostView = require('./views/host'),
	PhoneView = require('./views/phone');

$(function() {
	var socket = io.connect();

	socket.on('connected', function () {
		var options = {
			socket: this
		};

		if (Modernizr.touch) {
			var phone = new PhoneView(options);

			this.on('playerRestart', function(e) {
				console.log(e);
			});

		} else {
			var host = new HostView(options);
		}
	});
});
