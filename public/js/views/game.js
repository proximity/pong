var Backbone = require('backbone'),
	$ = require('jquery'),
	paddle = require('paddle');


var _game = {};

var animate = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	function(callback) { window.setTimeout(callback, 1000/60); };

var GameView = Backbone.View.extend({
	el: 'body',
	width: 400,
	height: 600,
	initialize: function() {
		_game = this;

		this.canvas = document.createElement('canvas');
		this.width = $(window).width();
		this.height = $(window).height();

		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.context = this.canvas.getContext('2d');

		window.onload = this.gameInit;
	},

	gameInit: function() {
		console.log(_game);
		document.body.appendChild(_game.canvas);
		animate(_game.step);
	},

	step: function() {
		_game.update();
		_game.render();
		animate(_game.step);
	},

	update: function() {
	},

	render: function() {
		_game.context.fillStyle = '#000';
		_game.context.fillRect(0, 0, _game.width, _game.height);
	}

});

module.exports = GameView;
