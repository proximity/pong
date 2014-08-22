var express = require('express'),
	path = require('path'),
	app = express(),
	argv = require('yargs').default({port: 8080}).argv,
	_ = require('underscore'),
	game = require('./game');

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(argv.port);

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
	console.log('client connected');
	game.init(io, socket);
});
