// app.js

$(document).ready(function (){
	getCharactersFromAPI();



	$(".js-character-form").on("submit", function(event){
							//if you hit "enter" or click
		//grab information from form
		event.preventDefault();
		console.log("FORM SUBMITTED");
		var name = $("#name").val();
		var occupation = $("#occupation").val();
		var weapon = $("#weapon").val();
		//create "params" hash
		var params = {
			name: name,
			occupation: occupation,
			weapon: weapon 
		};
		
		

		$.ajax({
			type: "POST",
			url: "https://ironhack-characters.herokuapp.com/characters",
			data: params,
			//gives back JSON
			success: updateList,
			error: characterError

		});

});


});
function getCharactersFromAPI() {
	$.ajax({
		type: "GET",
		url: "https://ironhack-characters.herokuapp.com/characters",
		success: showCharacters,
		error: characterLoadError

	});
}
function updateList(response) {
	$(".js-character-list").empty()
	$(".js-character-list").append();
	getCharactersFromAPI();
}

function characterError(err) {
	console.log("Error", err);
}

function showCharacters(response){
	response.forEach(function(character) {
		appendCharacter(character);
	});
}

function appendCharacter(character){
	var html = `
		<li>
		Name: ${character.name}
		Occupation: ${character.occupation}
		Weapon: ${character.weapon}
		</li>
		`;

		$(".js-character-list").append(html);

}

function characterLoadError(err) {
	console.log("Error", err);
}
