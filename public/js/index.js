var socket = io(); // create our connection.

socket.on('connect', function () {
	console.log('Connected to server');
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
	console.log('Newmessage', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
	e.preventDefault(); // override default behaviour

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('input[name=message]').val()
	}, function () {

	});
});







/*
socket.emit('createMessage', {
	from: 'Frank',
	text: 'Hi'
}, function (data) { // data frm server
	console.log('Got it', data);
});*/

