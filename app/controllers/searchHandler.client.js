let offset = 0;
let searchButton = document.querySelector('.js-search');
let prevSearchTerm = '';
let apiUrl = 'https://young-wildwood-8845.herokuapp.com/' || 'http://localhost:5000/';


let check13 = (e) =>{
	if(e.keyCode === 13)
		performSearch()
	return
}

let nextClick = ()=>{
	offset+=10;
	searchButton.click();
}

let prevClick = ()=>{
	if (offset===0)
		return;
	offset-=10;
	searchButton.click();
}

let performSearch = () => {
	let input = document.getElementById('search-input');
	let searchTerm = input.value;
	if (searchTerm!==prevSearchTerm) 
	{
		prevSearchTerm = searchTerm;
		offset = 0;
	}

	let dataDiv = document.querySelector('.js-data');
	let queryURL = apiUrl+'search/'+searchTerm+'?offset='+offset;



	let appendData = (data) =>{
		let html = '';

		for (let i = 0; i < data.length; i++) {
			html += `<div id="${i}" class="column col-md-2 col-sm-3 col-xs-6">
			<a href="${data[i].url}" target="_blank">
			<div class="spinner"></div>
			</a>
			</div>`;
		}


		html += `<div class="btn-group" role="group" aria-label="Previous button and next button">
		<button type="button" onclick="prevClick()" class="btn btn-default">Back</button>
		<button type="button" onclick="nextClick()" class="btn btn-default">Next</button>
		</div>`;

		dataDiv.innerHTML =	html;	

		for (let i = 0; i < data.length; i++) {
			let img = new Image();
			img.src = data[i].thumbnail;
			img.alt = data[i].snippet;
			img.className = "img img-responsive";
			img.onload = () => {
				let div = document.getElementById(i);
				// let spinner = div.querySelector('.spinner');
				let a = div.querySelector('a');
				// div.childNodes[0] not working for anchors or at all?
				// error occuring while appending or replacing child
				
				// anchor (a) is official parent of spinner
				a.innerHTML = ""; //delete all inner HTML
				a.appendChild(img); //add image
				// a.replaceChild(img, spinner);
			}
		}

	}
// appendData end function
// 

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			let data = JSON.parse(xhttp.responseText);
			appendData(data);
		}
	};
	xhttp.open("GET", queryURL, true);
	xhttp.send();

/*
	fetch(queryURL)
		.then(r=>r.json())
		.then(appendData);
		
		*/
	}