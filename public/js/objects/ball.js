var $ = require('jquery');

function Ball(x, y) {
	this.scored = 0;
	this.x = x;
	this.y = y;
	this.x_speed = 3;
	this.y_speed = 0;
	this.radius = 7;
	this.direction = true; // true = right, false = left
}

Ball.prototype.render = function(context) {
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
	context.fillStyle = "#fff";
	context.fill();
};

Ball.prototype.update = function(paddle1, paddle2) {
	this.scored = 0;
	this.x += this.x_speed;
	this.y += this.y_speed;
	var top_x = this.x - 5;
	var top_y = this.y - 5;
	var bottom_x = this.x + 5;
	var bottom_y = this.y + 5;

	var checkPaddle1 = this.x - 70 < 0;
	var checkPaddle2 = this.x + 60 > $(window).width();
	var checkBehindPaddle1 = this.x - 60 < 0;
	var checkBehindPaddle2 = this.x + 50 > $(window).width();
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

	if ( this.y - 5 < 0 ) { // ball hits ceiling
		this.y = 5;
		this.y_speed = - this.y_speed;
	} else if ( this.y > $(window).height() ) { // ball hits floor
		this.y = $(window).height() - 5;
		this.y_speed = - this.y_speed;
	}

	if ( checkPaddle1 || checkPaddle2 ) {
		// check if the ball has been blocked
		thisPaddle = checkPaddle1 ? paddle1 : paddle2;

		checkPaddleBottom = thisPaddle.y + thisPaddle.height;
		checkPaddleTop = thisPaddle.y;

		if (
				checkPaddleTop < bottom_y &&
				checkPaddleBottom > top_y &&
				!checkBehindPaddle1 &&
				!checkBehindPaddle2 &&
				((!this.direction && checkPaddle1) || (this.direction && checkPaddle2))
			) {
			if ( !isNaN(thisPaddle.hit_speed) && thisPaddle.hit_speed !== 0 ) {
				var
					defaultSpeed = 3,
					paddleUp = thisPaddle.y_speed < 0,
					paddleDown = !paddleUp,
					ballUp = this.y_speed < 0,
					ballDown = this.y_speed > 0,
					speed = (thisPaddle.hit_speed / 4),
					speedAbs = Math.abs(speed);

				// Don't increase or decrease the speed by more than defaultSpeed (3)
				if (speed > defaultSpeed) {
					speed = defaultSpeed;
				} else if (speed < -defaultSpeed) {
					speed = -defaultSpeed;
				}

				if ((ballUp && paddleUp) || (ballDown && paddleDown) || (!ballUp && !ballDown)) {
					this.x_speed += this.direction ? speedAbs : -speedAbs;
				} else {
					this.x_speed += this.direction ? -speedAbs : speedAbs;
				}

				this.y_speed -= speed;
			}

			this.x_speed *= -1;
			this.direction = !this.direction;
		} else if ( checkScore1 || checkScore2 ) {
			// A score has been made
			this.x_speed = 3;
			this.y_speed = 0;
			this.x = $(window).width()/2;
			this.y =$(window).height()/2;
			this.direction = true;

			if ( checkScore1 ) {
				this.scored = 2;
			} else {
				this.scored = 1;
			}
		}
	}
};

module.exports = Ball;
