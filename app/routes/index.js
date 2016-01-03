'use strict';

var request = require("request");
var path = process.cwd();
var debug = require('debug');
var routerDebug = debug('router');
var requestDebug = debug('request');
// var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');


module.exports = function (app) {


	app.get('/search/:q',function  (req,res) {
		routerDebug(req.query,req.path,req.params);

		var query = req.params.q;
		var offset = parseInt(req.query.offset);
		// if (!isNaN(offset)) {};
		var start = (!isNaN(offset)) ? (offset < 1) ?  '' : '&start=' + offset : '';
		// if (offset===0)
		var searchUrl = 'https://www.googleapis.com/customsearch/v1?q='+query+'&cx='+process.env.CX+'&searchType=image'+start+'&key='+process.env.API_KEY
		// res.end(searchUrl);
		// return;
		
		/*
		
		{
kind: "customsearch#result",
title: "Funky Monkeys (@funkymonkeys1) | Twitter",
htmlTitle: "<b>Funky Monkeys</b> (@funkymonkeys1) | Twitter",
link: "https://pbs.twimg.com/profile_images/1201089923/Funky_Monkey_Logo_Desktop.jpg",
displayLink: "twitter.com",
snippet: "Funky Monkeys (@funkymonkeys1)",
htmlSnippet: "<b>Funky Monkeys</b> (@funkymonkeys1)",
mime: "image/jpeg",
image: {
contextLink: "https://twitter.com/funkymonkeys1",
height: 483,
width: 500,
byteSize: 86406,
thumbnailLink: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSXm9Yrc4mAdxE7VfzGEnhPH5rm4QfE--_aWvoEZIk6fiiiP5hBoKvZt8I",
thumbnailHeight: 126,
thumbnailWidth: 130
}
},

		 */
		request.get(searchUrl,function  (err,response,body) {
			requestDebug(response.statusCode);
			if (!err && response.statusCode == 200) {
				requestDebug(body);
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

				res.send(respondArr);
			}
		});
	})

};
