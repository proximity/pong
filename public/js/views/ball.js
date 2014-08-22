
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

	if ( this.x - 5 < 0 ) { // hitting the left wall
	}
};

module.exports = Ball;
