var Backbone = require('backbone'),
	paddle = require('../objects/paddle');
	Player = require('../objects/player');
	Ball = require('../objects/ball');
	$ = require('jquery');

var context;
var animate = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	function(callback) { window.setTimeout(callback, 1000/60); };
var startHeight = ($(window).height()/2) - 50;

var player1 = new Player(50, startHeight);
var player2 = new Player($(window).width() - 50, startHeight);
var ball = new Ball($(window).width()/2, $(window).height()/2);

var HostView = Backbone.View.extend({
	el: 'body',

	initialize: function(options) {
		this.options = options;
		this.width = $(window).width();
		this.height = $(window).height();

		this.socket = options.socket;

		this.socket.emit('hostCreateGame');
		this.socket.on('newGameCreated', $.proxy(this.gameCreated, this));

		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		context = this.canvas.getContext('2d');

		this.socket.on('hostMovePlayerUp', $.proxy(this.playerMoveUp, this));
		this.socket.on('hostMovePlayerDown', $.proxy(this.playerMoveDown, this));
		this.socket.on('hostPausePlayer', $.proxy(this.playerPause, this));
	},

	gameCreated: function(data) {
		$('<h1/>').html(data.gameId).appendTo(this.$el);
		this.gameInit();
	},

	playerMoveUp: function() {
		player1.moveUp();
	},

	playerPause: function() {
		player1.pause();
	},

	playerMoveDown: function() {
		player1.moveDown();
	},

	gameInit: function() {
		document.body.appendChild(this.canvas);
		animate($.proxy(this.step, this));
	},

	step: function() {
		this.update();
		this.render();
		animate($.proxy(this.step, this));
	},

	update: function() {
		player2.update(ball);
		ball.update(player1.paddle, player2.paddle);
	},

	render: function() {
		context.fillStyle = '#000';
		context.fillRect(0, 0, this.width, this.height);
		player1.render(context);
		player2.render(context);
		ball.render(context);
	}
});

module.exports = HostView;
