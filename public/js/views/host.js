var Backbone = require('backbone'),
	GameView = require('./game'),
	$ = require('jquery');

var HostView = Backbone.View.extend({
	el: 'body',
	initialize: function() {
		this.game = new GameView();
	},
});

module.exports = HostView;
