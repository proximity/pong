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
var players = [
	new Player(50, startHeight),
	new Player($(window).width() - 50, startHeight)
	];
var ball = new Ball($(window).width()/2, $(window).height()/2);

var HostView = Backbone.View.extend({
	el: 'body',
	players: 0,

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
		this.socket.on('playerNumber', $.proxy(this.playerNumber, this));
	},

	gameCreated: function(data) {
		$('<h4/>').html('Visit ' + window.location.href + ' and enter in this code ' + data.gameId + ' to play').appendTo(this.$el);
		this.gameInit();
	},

	playerNumber: function(numPlayers) {
		this.numPlayers = numPlayers;
	},

	playerMoveUp: function(data) {
		players[data.playerId -1].moveUp();
	},

	playerPause: function(data) {
		players[data.playerId -1].pause();
	},

	playerMoveDown: function(data) {
		players[data.playerId -1].moveDown();
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
		if ( this.numPlayers < 2 ) {
			players[1].update(ball);
		}
		ball.update(players[0].paddle, players[1].paddle);
	},

	render: function() {
		context.fillStyle = '#000';
		context.fillRect(0, 0, this.width, this.height);
		players[0].render(context);
		players[1].render(context);
		ball.render(context);
	}
});

module.exports = HostView;
