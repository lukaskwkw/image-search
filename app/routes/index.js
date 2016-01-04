'use strict';

var Queries = require("../models/queries.js");
var searchHandler = require("../controllers/searchHandler.server.js");

module.exports = function (app) {


	app.get('/search/:q',searchHandler);
	app.get('/recent',function  (req,res) {
		Queries.find({},function  (err,data) {
			data = data.map(function  (item) {
				return {term : item.term, when : item.when}
			})
			res.end(JSON.stringify(data));
		})
	})

};
