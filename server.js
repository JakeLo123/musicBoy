const socket = require('socket.io');
const express = require('express');
const app = express();
const path = require('path');

// const rootPath = path.join(__dirname, '..', '..');
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

const socketConnector = (io) => {
	io.on('connection', (aSocket) => {
		console.log('NOTE: client socket connection established: ');
		aSocket.on('update-grid', (node) => {
			console.log('grid updated SERVER');
			aSocket.broadcast.emit('grid-updated', node);
		});
		aSocket.on('disconnect', () => {
			console.log(`Connection ${aSocket.id} has left the building`);
		});
	});
};

const main = () => {
	const applicationPort = 8080;
	const server = app.listen(applicationPort, (error) => {
		if (error) throw error;
		console.log('NOTE: application server listening on port ', applicationPort);
	});
	const io = socket(server);
	socketConnector(io);
};
main();
