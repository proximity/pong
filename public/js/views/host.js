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
	gameId: 0,
	players: 0,
	againstComputer: 1,
	// if you play a 2 player game, the computer could potentially be in
	// the player 1 position
	computerPosition: 1,

	initialize: function(options) {
		/*var backgroundImage = new Image();
		backgroundImage.src = '../../assets/bg2.png'; */
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
		var html = 'Visit ' + window.location.href + ' and enter in the code &quot;' + data.gameId + '&quot; to play';
		$('<h4/>').html(html).appendTo(this.$el);
		this.gameId = data.gameId;
		$('<h2 class="player1 score"/>').html('0').appendTo(this.$el);
		$('<h2 class="player2 score"/>').html('0').appendTo(this.$el);
		this.gameInit();
	},

	resetScore: function() {
		$('.player1').html('0');
		$('.player2').html('0');
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

	updateScore: function() {
		var scoreCard = $('.player' + ball.scored);
		var currentScore = parseInt(scoreCard.html()) + 1;
		var data = {
			gameId: this.gameId
		};

		if ( currentScore >= 3 && this.numPlayers >= 2 ) {
			this.numPlayers = 1;
			this.againstComputer = 0;
			this.resetScore();
			if ( ball.scored == 1 ) {
				this.againstComputer = 1;
			}
			this.computerPosition = data.playerToLeave = (this.againstComputer + 1);
			this.socket.emit('playerRestart', data);
		} else {
			scoreCard.html(currentScore);
		}
	},

	step: function() {
		if ( ball.scored ) {
			this.updateScore();
		}
		this.update();
		this.render();
		animate($.proxy(this.step, this));
	},

	update: function() {
		if ( this.numPlayers >= 1 ) {
			if ( this.numPlayers < 2 ) {
				console.log(this, players);
				players[this.computerPosition].update(ball);
			}
			ball.update(players[0].paddle, players[1].paddle);
		}
	},

	render: function() {
		var backgroundImage = new Image();
		backgroundImage.src = '../../assets/bg.png';
		var ptrn = context.createPattern(backgroundImage, 'repeat');
		context.fillStyle = ptrn;
		context.fillRect(0, 0, this.width, this.height);
		players[0].render(context);
		players[1].render(context);
		ball.render(context);
	}
});

module.exports = HostView;
