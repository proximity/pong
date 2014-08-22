var App = {};

var IO = {
	init: function() {
		IO.socket = io.connect();
		IO.bindEvents();
	},

	bindEvents: function() {
		IO.socket.on('connected', IO.onConnected);
	},

	onConnected: function() {
		App.socketId = IO.socket.socket.sessionid;

		console.log(App.socketId);
	}
}

module.exports = IO;
