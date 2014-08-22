var Backbone = require('backbone'),
	GameView = require('./game'),
	$ = require('jquery');

var HostView = Backbone.View.extend({
	el: 'body',

	gameId: 0,

	initialize: function(options) {
		this.socket = options.socket;
		this.game = new GameView();

		this.socket.emit('hostCreateNewGame');

		this.socket.on('newGameCreated', this.gameCreated);
	},

	gameCreated: function(data) {
		console.log(data);
	}

});

module.exports = HostView;
