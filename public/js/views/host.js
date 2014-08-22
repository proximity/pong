var Backbone = require('backbone'),
	GameView = require('./game'),
	paddle = require('./paddle');
	Player = require('./player');
	Ball = require('./ball');
	$ = require('jquery');
var animate = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	function(callback) { window.setTimeout(callback, 1000/60); };

var context;
var startHeight = ($(window).height()/2) - 50;
var player1 = new Player(50, startHeight);
var player2 = new Player($(window).width() - 50, startHeight);
var ball = new Ball($(window).width()/2, $(window).height()/2);

var HostView = Backbone.View.extend({
	el: 'body',

	gameId: 0,

	initialize: function(options) {
		this.options = options;
		this.socket = options.socket;

		this.socket.emit('hostCreateGame');
		this.socket.on('newGameCreated', $.proxy(this.gameCreated, this));

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

	gameCreated: function(data) {
		$('<h1/>').html(data.gameId).appendTo(this.$el);
	},

	playerMoveUp: function() {
		console.log('halo move up');
		player1.moveUp();
	},

	playerMoveDown: function() {
		console.log('halo move down');
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
		ball.update(player1.paddle, player2.paddle);
		player1.update();
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
