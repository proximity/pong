
var Paddle = require('./paddle');
var keysDown = {};

window.addEventListener("keydown", function(event) {
	keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
	delete keysDown[event.keyCode];
});

function Player(x, y) {
	this.paddle = new Paddle(x, y, 10, 100);
}

Player.prototype.render = function(context) {
	this.paddle.render(context);
};

Player.prototype.update = function() {
	for ( var key in keysDown ) {
		var value = Number(key) ;

		if ( value == 37 ) { //left arrow
			this.paddle.move(0, -4, -0.3);
			return true;
		} else if ( value == 39 ) {
			this.paddle.move(0, 4, 0.3);
			return true;
		}
	}
	this.paddle.move(0, 0, 0);
};

Player.prototype.moveDown = function() {
	this.paddle.move(0, 4, -0.3);
};
Player.prototype.moveUp = function() {
	this.paddle.move(0, 4, 0.3);
};


module.exports = Player;
