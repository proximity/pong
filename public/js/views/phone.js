var _ = require('underscore');
var Backbone = require('backbone');

function getParams() {
	var params = {};

	window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(match, key, value) {
		params[key] = value;
	});

	return params;
}

var PhoneView = Backbone.View.extend({
	el: '#page',

	gameId: 0,

	socket: null,

	events: {
		'touchstart #mobile-container-top': 'movePlayerUp',
		'touchstart #mobile-container-bottom': 'movePlayerDown'
	},

	template: _.template($('#phone-view-template').html()),

	initialize: function(options) {
		var gameId = getParams().game;

		if (undefined === gameId) {
			gameId = prompt('Please enter game ID');
		}

		this.gameId = gameId;
		this.socket = options.socket;
		this.socketId = this.socket.socket.sessionid;

		this.render();
	},

	render: function() {
		this.$el.html(this.template());

		return this;
	},

	movePlayerUp: function() {
		var data = {
			gameId: this.gameId,
			playerId: this.socketId
		}

		this.socket.emit('hostMovePlayerUp', data);
	},

	movePlayerDown: function() {
		var data = {
			gameId: this.gameId,
			playerId: this.socketId
		}

		this.socket.emit('hostMovePlayerDown', data);
	}
});

module.exports = PhoneView;
