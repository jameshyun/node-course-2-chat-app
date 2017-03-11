const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
// console.log(__dirname + '/../public'); // old way
// console.log(publicPath);
const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
	console.log(`Server is up on ${port}`);
});














/**
 * old way to set path - __dirname + '/../public' 
 * new way to set path - path.join(__dirname, '../public')
 */