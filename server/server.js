const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
// console.log(__dirname + '/../public'); // old way
// console.log(publicPath);
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app); // integrate express app server here
//configure server to use socket.io
var io = socketIO(server); // io is now web socket server
var users = new Users();

app.use(express.static(publicPath));


io.on('connection', (socket) => {// listen for a new connection
	console.log('New user connected');

	
	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and room name are required.');
		}

		socket.join(params.room);
		users.removeUser(socket.id);		
		users.addUser(socket.id, params.name, params.room);

		// socket.leave('The Office Fans');
		
		// io.emit -> io.to('The Office Fans').emit
		// socket.broadcast.emit -> socket.braodcast.to('The Office Fans').emit
		// socket.emit

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
		callback();
	});

	socket.on('createMessage', (message, callback) => {
		// console.log('createMessage', message);
		var user = users.getUser(socket.id);

		if (user && isRealString(message.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));	
		}
		
		callback(); // callback frn in client		
	});

	socket.on('createLocationMessage', (coords) => {
		var user = users.getUser(socket.id);

		if (user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));	
		}
		
	});

	socket.on('disconnect', () => {		
		// console.log('User was disconnected');
		var user = users.removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
		}
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