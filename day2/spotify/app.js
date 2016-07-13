// app.js
$(document).ready(function (){
	getArtistsFromAPI();

	$(".js-artist-form").on("submit", function(event){
							//if you hit "enter" or click
		//grab information from form
		event.preventDefault();
		console.log("FORM SUBMITTED");
		var artists = $("#artists").val();
		//create "params" hash
		var params = {
			artists: artists 
		}

			$.ajax({
			type: "POST",
			url: "https://api.spotify.com/v1/search?type=artist&query=SEARCHTERM",
			data: artists,
			//gives back JSON
			success: updateList,
			error: postError

		});
	});
});

function getArtistsFromAPI() {
	$.ajax({
		type: "GET",
		url: "https://api.spotify.com/v1/search?type=artist&query=SEARCHTERM",
		success: showArtists,
		error: artistError

	});
	}

	function updateList(response) {
		$(".js-artist-list").empty();
		$(".js-artist-list").append();
		getArtistsFromAPI();
			}

	function artistError(err) {
		console.log("Error", er);
	}

	function showArtists(response){
		response.forEach(function(artist){
			appendArtist(artist);
		});
	}

	function appendArtist(artist){
		var html = `
		<li>
		artists
		</li>
		`
		$(".js-artist-list").append(html);
	}