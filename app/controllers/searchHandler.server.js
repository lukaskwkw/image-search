'use strict';

var Queries = require('../models/queries.js');
var request = require("request");


function searchHandler (req, res) {

		var query = req.params.q;
		var offset = parseInt(req.query.offset);
		var start = (!isNaN(offset)) ? (offset > 0) ?  '&start=' + offset : '' : '';
		var searchUrl = 'https://www.googleapis.com/customsearch/v1?q='+query+'&cx='+process.env.CX+'&searchType=image'+start+'&key='+process.env.API_KEY


		request.get(searchUrl,function  (err,response,body) {
			if (!err && response.statusCode == 200) {
				var items = JSON.parse(body).items;
				var respondArr = [];
				for (var i = 0; i < items.length; i++) {
					var respondItem =
					{
						url:  items[i].link,
						snippet:  items[i].snippet,
						thumbnail:  items[i].image.thumbnailLink,
						context: items[i].image.contextLink
					}
					respondArr.push(respondItem);
				};

				var q = new Queries({term : query});
				q.save();

				res.send(respondArr);
			}
			else{
				res.end();
			}
		});
	}

module.exports = searchHandler;
