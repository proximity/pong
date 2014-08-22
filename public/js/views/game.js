var Backbone = require('backbone'),
	$ = require('jquery'),
	paddle = require('./paddle');
	Player = require('./player');
	Ball = require('./ball');

var _game = {};

var animate = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	function(callback) { window.setTimeout(callback, 1000/60); };

var context;
var startHeight = ($(window).height()/2) - 50;
var player1 = new Player(50, startHeight);
var player2 = new Player($(window).width() - 50, startHeight);
var ball = new Ball($(window).width()/2, $(window).height()/2);

var GameView = Backbone.View.extend({
	el: 'body',
	width: 400,
	height: 600,
	initialize: function(options) {
		_game = this;
		this.socket = options.socket;

		this.canvas = document.createElement('canvas');
		this.width = $(window).width();
		this.height = $(window).height();

		this.canvas.width = this.width;
		this.canvas.height = this.height;
		context = this.canvas.getContext('2d');

		console.log('My socket',this.socket);
		this.socket.on('hostMovePlayerUp', $.proxy(this.playerMoveUp, this));
		this.socket.on('hostMovePlayerDown', $.proxy(this.playerMoveDown, this));
		this.gameInit();
	},

	playerModeUp: function() {
		console.log('halo move up');
		player1.moveUp();
	},

	playerModeDown: function() {
		console.log('halo move down');
		player1.moveDown();
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
		ball.update(player1.paddle, player2.paddle);
		player1.update();
	},

	render: function() {
		context.fillStyle = '#000';
		context.fillRect(0, 0, _game.width, _game.height);
		player1.render(context);
		player2.render(context);
		ball.render(context);
	}

});

module.exports = GameView;
