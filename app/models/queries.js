'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Query = new Schema({
	term : String
},{timestamps : {createdAt : 'when'} });

module.exports = mongoose.model('Query', Query);
