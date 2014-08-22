var Backbone = require('backbone'),
	GameView = require('./game'),
	$ = require('jquery');

var HostView = Backbone.View.extend({
	el: 'body',

	gameId: 0,

	initialize: function(options) {
		this.options = options;
		this.socket = options.socket;

		this.socket.emit('hostCreateGame');
		this.socket.on('newGameCreated', $.proxy(this.gameCreated, this));
	},

	gameCreated: function(data) {
		$('<h1/>').html(data.gameId).appendTo(this.$el);
		this.game = new GameView(this.options);
		console.log(data);
	}

});

module.exports = HostView;
