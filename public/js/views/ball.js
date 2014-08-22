var $ = require('jquery');

function Ball(x, y) {
	this.x = x;
	this.y = y;
	this.x_speed = 3;
	this.y_speed = 0;
	this.radius = 5;
}

Ball.prototype.render = function(context) {
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
	context.fillStyle = "#fff";
	context.fill();
};

Ball.prototype.update = function(paddle1, paddle2) {
	this.x += this.x_speed;
	this.y += this.y_speed;
	var top_x = this.x - 5;
	var top_y = this.y - 5;
	var bottom_x = this.x + 5;
	var bottom_y = this.y + 5;

	var checkPaddle1 = this.x - 65 < 0;
	var checkPaddle2 = this.x + 55 > $(window).width();
	var checkScore1 = this.x < 0;
	var checkScore2 = this.x > $(window).width();

	var checkPaddleTop;
	var checkPaddleBottom;
	// ball hits left wall
	// ball hits left paddle
	// ball hits right wall
	// ball hits right paddle
	// ball hits top
	// ball hits floor
	if ( this.y - 5 < 0 ) {
		// player 2 scores
		this.y = 5;
		this.y_speed = - this.y_speed;


	} else if ( this.y > $(window).height() ) {
		// player 2 hits
		this.y = $(window).height() - 5;
		this.y_speed = - this.y_speed;
	}

	if ( checkPaddle1 || checkPaddle2 ) {
		// check if the ball has been blocked
		thisPaddle = checkPaddle1 ? paddle1 : paddle2;

		checkPaddleBottom = thisPaddle.y + thisPaddle.height;
		checkPaddleTop = thisPaddle.y;

		if ( checkPaddleTop < bottom_y && checkPaddleBottom > top_y ) {
			if ( thisPaddle.y_speed !== 0 ) {
				// paddles direction is up
				var paddleDown = thisPaddle.y_speed > 0;
				this.y_speed += paddleDown ? 3 : -3;
			}

			this.x_speed *= -1;
		}
		if ( checkScore1 || checkScore2 ) {
			// A score has been made
			this.x_speed = 3;
			this.y_speed = 0;
			this.x = $(window).width()/2;
			this.y =$(window).height()/2;

			if ( checkScore1 ) {
				console.log('Player 2 scores');
			} else {
				console.log('Player 1 scores');
			}

		}
	}

};

module.exports = Ball;