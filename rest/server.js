var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var PORT = 1337;

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

var config = require('./config.js');
global.db = config.connectDB();

process.env.SECRET_KEY = 'wh8R374QRz1MwNCz';

app.use('/', require('./config.js').routers());

app.listen(PORT, function(){
	console.log('server is running on PORT ' + PORT + ' ... ');
});