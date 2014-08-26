var io, gameSocket;

exports.init = function(sio, socket) {
	io = sio;
	gameSocket = socket;

	gameSocket.emit('connected');

	// Host
	gameSocket.on('hostCreateGame', hostCreateGame);
	gameSocket.on('hostRoomFull', hostPrepareGame);
	gameSocket.on('hostCountdownFinished', hostStartGame);
	// gameSocket.on('hostNextRound', hostNextRound);

	// Player
	gameSocket.on('playerJoinGame', playerJoinGame);
	gameSocket.on('playerMoveUp', playerMoveUp);
	gameSocket.on('playerMoveDown', playerMoveDown);
	gameSocket.on('playerPause', playerPause);
	gameSocket.on('playerRestart', playerRestart);
};

function hostCreateGame() {
	var gameId = (Math.random() * 10000) | 0;

	this.join(gameId);
	this.emit('newGameCreated', {gameId: gameId, socketId: this.id});
}

function hostPrepareGame(gameId) {
	io.sockets.in(gameId).emit('beginNewGame', {gameId: gameId, socketId: this.id});
}

function hostStartGame(gameId) {
	console.log('Start Game');
}

function playerJoinGame(data) {
	var room = gameSocket.manager.rooms['/' + data.gameId];

	if (undefined !== room) {
		// if more than 2 players dont let them join
		if ( room.length > 2 ) {
			this.emit('error', {message: 'This room is full'});
			return;
		}
		data.socketId = this.id;
		var playerId = room.length;

		this.join(data.gameId);

		io.sockets.in(data.gameId).emit('playerNumber', playerId);
		io.sockets.in(data.gameId).emit('playerJoined', data);
	} else {
		this.emit('error', {message: 'This room does not exist'});
	}
}

function playerPause(data) {
	io.sockets.in(data.gameId).emit('hostPausePlayer', data);
}
function playerMoveUp(data) {
	io.sockets.in(data.gameId).emit('hostMovePlayerUp', data);
}

function playerMoveDown(data) {
	io.sockets.in(data.gameId).emit('hostMovePlayerDown', data);
}

function playerRestart(data) {

}
