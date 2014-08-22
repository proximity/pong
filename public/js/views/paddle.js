var $ = require('jquery');

function Paddle(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.x_speed = 0;
	this.y_speed = 0;
}


Paddle.prototype.render = function(context) {
	context.fillStyle = "#fff";
	context.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.move = function(x, y) {
	this.x += x;
	this.y += y;
	this.x_speed = x;
	this.y_speed = y;

	if ( this.y < 0 ) {
		this.y = 0;
		this.y_speed = 0;
	} else if ( this.y + this.height > $(window).height() ) {
		this.y = $(window).height() - this.height;
		this.y_speed = 0 ;
	}
	console.log(this.y_speed, this.x_speed);
};

Paddle.prototype.stop = function() {
	this.y_speed = 0;
};


module.exports = Paddle;
