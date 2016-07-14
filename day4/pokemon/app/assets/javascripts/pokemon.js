// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
PokemonApp.Pokemon = class {
	constructor (pokemonUri) {
		this.id = PokemonApp.idFromUri( pokemonUri);
	}

	render () {
		// console.log("Rendering pokemon #" + this.id);

	$.ajax({
		type: "GET",
		url: "/api/pokemon/" + this.id,
		success: function (response) {
			// console.log("Pokemon Info:");
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
			var evolutions = `
			<li>
			<ul>
			<li> <button type="button" class="evolution_button" data-toggle="modal" data-target="#myModal">
  See Evolutions
</button> </li>
			</ul>
			</li>

			`; $(".js-pkmn-evolutions").append(evolutions);
			
			response.types.forEach (function (x) {

				var html = `
			 <li>
			 <ul>
        <li>${x.name}</li>
        </ul>
      </li>
			`;

				$(".js-pkmn-types").append(html);
			});

				var pokeArray = response.descriptions.sort(function(a, b){
				    if(b.name < a.name) return -1;
				    if(b.name > a.name) return 1;
				    return 0;
				});


				var pokeDesc = pokeArray[0].resource_uri

			
			getDesc(pokeDesc);
	



			var pokePhoto = (response.sprites[0].resource_uri);
			getPhotos(pokePhoto);



			$(".js-pokemon-modal").modal("show");

			$(".evolution_button").on("click", function (event) {
				event.preventDefault();
			$(".js-pokemon-modal").modal("hide");
			$(".js-evolution-modal").modal("show");
			
			$(".js-evolution-name").text(response.name);
			$(".js-evolution-number").text(response.pkdx_id);

			var evolPoke = (response.evolutions[0].resource_uri);
			getEvols(evolPoke);

					var back = `
			<li>
			<ul>
			<li> <button type="button" class="back_button" data-toggle="modal" data-target="#myModal">
  Back
</button> </li>
			</ul>
			</li>

			`; $(".js-back-evolutions").html(back);
			$(".js-back-evolutions").on("click", function (event) {
				event.preventDefault();
			$(".js-pokemon-modal").modal("show");
			$(".js-evolution-modal").modal("hide");
			});

			});
		},
		error: function (error) {
			console.log("Error!!")
		}

	});

	
	function getPhotos(pokePhoto) {
	$.ajax({
		type: "GET",
		url: pokePhoto,
		success: function (response) {
			 console.log(response);
			
		var lookPoke = `
		<li>
		<ul>
		<li> <img src= "http://pokeapi.co/${response.image}" height="200" width="400"> </li>
		
		</ul>
		</li>
		`;
		$(".js-pkmn-pics").html(lookPoke);
			}

	});
	}
	
	function getEvols(evolPoke) {
		$.ajax({
			type: "GET",
			url: evolPoke,
			success: function (response) {
				console.log(response);
				var pokeEvol = `
		<li>
		<ul>
		<li> <img src= "http://pokeapi.co/${response.sprites[0].resource_uri}" height="200" width="400"> </li>
		
		</ul>
		</li>
		`;
		$(".js-evolution-sprites").append(pokeEvol);
			}

		});
	}

	function getDesc(pokeDesc) {
	$.ajax({
		type: "GET",
		url: pokeDesc,
		success: function (response) {
			console.log("bananassss!");
			console.log(response)
			
		var descPoke = `
		<li>
		<ul>
		<li> ${response.description} </li>
		
		</ul>
		</li>
		`;
		$(".js-pkmn-desc").html(descPoke);
			}

	});
	}

}
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