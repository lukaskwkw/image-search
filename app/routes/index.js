'use strict';

var Queries = require("../models/queries.js");
var searchHandler = require("../controllers/searchHandler.server.js");

module.exports = function (app) {


	app.get('/search/:q',searchHandler);
	app.get('/recent',function  (req,res) {
		var Projection = {_id : 0, term : 1, when : 1};
		Queries.find({}, Projection).limit(10).sort({when : -1}).exec(function  (err,data) {
			res.end(JSON.stringify(data,null,'\t'));
		});
	})

};
