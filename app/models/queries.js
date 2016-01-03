'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Query = new Schema({
	query : String,
	date : Date
});

module.exports = mongoose.model('Query', Query);
