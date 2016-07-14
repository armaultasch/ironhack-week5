// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
PokemonApp.Pokemon = class {
	constructor (pokemonUri) {
		this.id = PokemonApp.idFromUri( pokemonUri);
	}

	render () {
		console.log("Rendering pokemon #" + this.id);

	$.ajax({
		type: "GET",
		url: "/api/pokemon/" + this.id,
		success: function (response) {
			console.log("Pokemon Info:");
			console.log(response);
			$(".js-pkmn-name").text(response.name);
			$(".js-pkmn-number").text(response.pkdx_id);
			$(".js-pkmn-height").text(response.height);
			$(".js-pkmn-weight").text(response.weight);
			$(".js-pkmn-hp").text(response.hp);
			$(".js-pkmn-atk").text(response.attack);
			$(".js-pkmn-dfs").text(response.defense);
			$(".js-pkmn-spatk").text(response.sp_atk);
			$(".js-pkmn-spdfs").text(response.sp_def);
			$(".js-pkmn-speed").text(response.speed);
			$(".js-pkmn-types").text(response.types);

			$(".js-pokemon-modal").modal("show");
		},
		error: function (error) {
			console.log("Error!!")
		}

	});
	};
}

PokemonApp.idFromUri = function (pokemonUri) {
	var uriSegments = pokemonUri.split("/");
	var secondLast = uriSegments.length - 2;
	return uriSegments[secondLast];
}

$(document).on("ready", function () {
	$(".js-show-pokemon").on("click", function (event) {
		var $button = $(event.currentTarget);
		var pokemonUri = $button.data("pokemonUri");

		var pokemon = new PokemonApp.Pokemon(pokemonUri);
		pokemon.render();
	});
});