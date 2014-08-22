
var Paddle = require('./paddle');

function Player(x, y) {
	console.log('paddles');
	this.paddle = new Paddle(x, y, 10, 100);
}

Player.prototype.render = function(context) {
	this.paddle.render(context);
};

module.exports = Player;
