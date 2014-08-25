
var Paddle = require('./paddle');

function Player(x, y) {
	this.paddle = new Paddle(x, y, 10, ($(window).height()/6));
}

Player.prototype.render = function(context) {
	this.paddle.render(context);
};

Player.prototype.pause = function() {
	clearInterval(this.movement);
	this.paddle.move(0, 0, 0);
};

Player.prototype.moveDown = function() {
	var that = this;
	this.movement = setInterval(function(){
		that.paddle.move(0, 4, -0.3);
	}, 10);
};

Player.prototype.moveUp = function() {
	var that = this;
	this.movement = setInterval(function(){
		that.paddle.move(0, -4, 0.3);
	}, 10);
};

Player.prototype.update = function(ball) {
	var y_pos = ball.y;
	var diff = -((this.paddle.y + (this.paddle.height / 2)) - y_pos);
	if ( diff < 0 && diff < -4 ) {
		diff = -5;
	} else if ( diff > 0 && diff > 4 ) {
		diff = 5;
	}

	this.paddle.move(0, diff);

	if ( this.paddle.y < 0 ) {
		this.paddle.y = 0;
	} else if ( this.paddle.y + this.paddle.height > $(window).width() ) {
		this.paddle.y = $(window).width() - this.paddle.height;
	}
};


module.exports = Player;
