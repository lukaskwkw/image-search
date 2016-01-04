'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');

var app = express();
require('dotenv').load();

mongoose.connect(process.env.MONGO_URI);

app.use(express.static(process.cwd() + '/public'));

routes(app);

var port = process.env.PORT || 5000;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});