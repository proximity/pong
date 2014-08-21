var Game, io, gameSocket;

Game.init = function(sio, socket) {
	io = sio;
	gameSocket = socket;

	gameSocket.emit('connected');

	// Host
	gameSocket.on('hostCreateGame', Game.hostCreateGame);
	gameSocket.on('hostRoomFull', Game.hostPrepareGame);
	gameSocket.on('hostCountdownFinished', Game.hostStartGame);
	gameSocket.on('hostNextRound', Game.hostNextRound);

	// Player
	gameSocket.on('playerJoinGame', Game.playerJoinGame);
	gameSocket.on('playerMoveUp', Game.playerMoveUp);
	gameSocket.on('playerMoveDown', Game.playerMoveDown);
	gameSocket.on('playerRestart', Game.playerRestart);
};

Game.hostCreateGame = function() {

};

Game.hostPrepareGame = function() {

};

Game.hostStartGame = function() {

};

Game.hostNextRound = function() {

};

Game.playerJoinGame = function() {

};

Game.playerMoveUp = function() {

};

Game.playerMoveDown = function() {

};

Game.playerRestart = function() {

};

module.exports = Game;
