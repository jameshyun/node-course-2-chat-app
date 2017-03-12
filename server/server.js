const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
// console.log(__dirname + '/../public'); // old way
// console.log(publicPath);
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app); // integrate express app server here
//configure server to use socket.io
var io = socketIO(server); // io is now web socket server

app.use(express.static(publicPath));


io.on('connection', (socket) => {// listen for a new connection
	console.log('New user connected');

	// socket.emit frm Admin text Welcome to the chat app
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	// socket.broadcast.emit frm Admin text New user joined
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));


	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', message);

		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('This is from the server.'); // callback frn in client
		// socket.broadcast.emit('newMessage', {
		//   from: message.from,
		//   text: message.text,
		//   createdAt: new Date().getTime()
		// });
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	})
})

server.listen(port, () => {
	console.log(`Server is up on ${port}`);
});














/**
 * old way to set path - __dirname + '/../public' 
 * new way to set path - path.join(__dirname, '../public')
 * socket has both front and backend library
 * io.on() - let u register an event listner. we can listen for a specific event and do something when that event happens
 * broadcast - emitting an event to everybody, but one specific user
 */