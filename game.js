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
	gameSocket.on('playerRestart', playerRestart);
};

function hostCreateGame() {
	var gameId = (Math.random() * 10000) | 0;

	this.emit('newGameCreated', {gameId: gameId, socketId: this.id});
	this.join(gameId.toString());
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
		data.socketId = this.id;

		this.join(data.gameId);

		io.sockets.in(data.gameId).emit('playerJoined', data);
	} else {
		this.emit('error', {message: 'This room does not exist'});
	}
}

function playerMoveUp(data) {
	data.playerId = this.id;

	io.sockets.in(data.gameId).emit('hostMovePlayerUp', data);
}

function playerMoveDown(data) {
	data.playerId = this.id;

	io.sockets.in(data.gameId).emit('hostMovePlayerDown', data);
}

function playerRestart(data) {

}
