// app.js
$(document).ready(function (){

	$(".js-artist-form").on("submit", function(event){
		event.preventDefault();
		fetchArtist();
	});

	

});


function fetchArtist(){
	
		var searchTerm = $(".searchbox").val();
		getArtists(searchTerm);
	
	}

function getArtists(searchTerm) {
	$.ajax({
		type: "GET",
		url: "https://api.spotify.com/v1/search?type=artist&query=" + searchTerm,
		success: showArtist,
		error: handleError

	}); 
	}

function getAlbums() {
	$(".artistPhoto").on("click", function(event){
		console.log("sup");
	var artistID = $(event.currentTarget).data("artist-id");
	

	$.ajax({
		type: "GET",
		url: "https://api.spotify.com/v1/artists/" + artistID + "/albums",
		success: showAlbum,
		error: handleError

	}); 
	});
	}

	function getTracks() {
	$(".albumName").on("click", function(event){
		console.log("sup");
	var albumID = $(event.currentTarget).data("album-id");
	

	$.ajax({
		type: "GET",
		url: "https://api.spotify.com/v1/albums/" + albumID + "/tracks",
		success: showTracks,
		error: handleError

	}); 
	});
	}


	function handleError(err) {
		console.log("Error", err);
	}

	function showArtist(response) {
		console.log(response);
		$(".js-artist-list").empty();
		$(".js-album-list").empty();
		var artistID = (response.artists.items[0].id);
		var listArtist = `
		<li>
		<h3> ${response.artists.items[0].name} </h3>
		<ul>
		<li> Photos: <img class="artistPhoto" data-artist-id = "${artistID}" src="${response.artists.items[0].images[0].url}" height="400" width="600"> </li>
		</ul>
		</li>
		`;
		$(".js-artist-list").html(listArtist);
		
		getAlbums();
	 
	}
function showAlbum(response) {

		console.log(response);
		$(".js-album-list").empty();
		var albumID = (response.items.id);
		response.items.forEach(function (album) {

			
			var listAlbum = `
			 <li>
			 <ul class="albumName" data-album-id = "${album.id}" >
        <li> <h3> ${album.name} </h3> </li>
        </ul>
      </li>
			`; $(".js-album-list").append(listAlbum);
		});
		getTracks();
		
	// 	$(".artistPhoto").on("click", function(event){
	// 	console.log("sup");
	// 	getAlbums(artistID);
	// });
	}

	function showTracks (response) {
		console.log(response);
	}
