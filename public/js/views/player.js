
var Paddle = require('./paddle');
var keysDown = {};

window.addEventListener("keydown", function(event) {
	keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
	delete keysDown[event.keyCode];
});

function Player(x, y) {
	console.log('paddles');
	this.paddle = new Paddle(x, y, 10, 100);
}

Player.prototype.render = function(context) {
	this.paddle.render(context);
};

Player.prototype.update = function() {
	for ( var key in keysDown ) {
		var value = Number(key) ;

		if ( value == 37 ) { //left arrow
			this.paddle.move(0, -4);
			return true;
		} else if ( value == 39 ) {
			this.paddle.move(0, 4);
			return true;
		}
	}
	this.paddle.move(0,0);
};


module.exports = Player;
