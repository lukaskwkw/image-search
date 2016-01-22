'use strict';

var offset = 0;
var searchButton = document.querySelector('.js-search');
var prevSearchTerm = '';

var nextClick = function nextClick() {
	offset += 10;
	searchButton.click();
};

var prevClick = function prevClick() {
	if (offset === 0) return;
	offset -= 10;
	searchButton.click();
};

var performSearch = function performSearch() {
	var input = document.getElementById('search-input');
	var searchTerm = input.value;
	if (searchTerm !== prevSearchTerm) {
		prevSearchTerm = searchTerm;
		offset = 0;
	}

	var dataDiv = document.querySelector('.js-data');
	var queryURL = 'http://localhost:5000/search/' + searchTerm + '?offset=' + offset;
	// console.log(queryURL);
	fetch(queryURL).then(function (r) {
		return r.json();
	}).then(function (data) {
		var html = '';

		for (var i = 0; i < data.length; i++) {
			html += '<div id="' + i + '" class="column col-md-2 col-sm-3 col-xs-6">\n\t\t\t\t<a href="' + data[i].url + '">\n\t\t\t\t<div class="spinner"></div>\n\t\t\t\t</a>\n\t\t\t\t\t</div>';
		}

		html += '<div class="btn-group" role="group" aria-label="...">\n  <button type="button" onclick="prevClick()" class="btn btn-default">Back</button>\n  <button type="button" onclick="nextClick()" class="btn btn-default">Next</button>\n</div>';

		dataDiv.innerHTML = html;

		var _loop = function _loop(i) {
			var img = new Image();
			img.src = data[i].thumbnail;
			img.alt = data[i].snippet;
			img.className = "img img-responsive";
			img.onload = function () {
				var div = document.getElementById(i);
				// let spinner = div.querySelector('.spinner');
				var a = div.querySelector('a');
				// div.childNodes[0] not working for anchors or at all?
				// error occuring while appending or replacing child

				// anchor (a) is official parent of spinner
				a.innerHTML = ""; //delete all inner HTML
				a.appendChild(img); //add image
				// a.replaceChild(img, spinner);
			};
		};

		for (var i = 0; i < data.length; i++) {
			_loop(i);
		}
	});
};
