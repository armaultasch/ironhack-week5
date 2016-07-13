// app.js
$(document).ready(function (){
	console.log("The document is ready");

	if ("geolocation" in navigator) {
		console.log("Browser has geolocation");

		// var options = { timeout: 1000};
		navigator.geolocation.getCurrentPosition( showPosition, handleError);

	}
	else {
		console.log("Browser doesn't have geolocation.");
	var html = `
	<h2> Update your browser, bro. </h2>
	<p> Your browser is older than dirt. 
		Update it to use these cool geolocation features.
		</p>
	`;
	$("body").append(html);
	}
});

function showPosition (position) {
	console.log("User consented to give location.")
	console.log(position);

	var lat = position.coords.latitude;
	var lng = position.coords.longitude;

	var html = `
	<h2> Your position </h2>
	<ul>
		<li> Latitude: ${lat} </li>
		<li> Longitude: ${lng} </li>
	</ul>

	<img src="https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&size=400x260&zoom=15">

	`;

	$("body").append(html);
}
function handleError (error) {
	console.log("Error getting position.");
	console.log(error);

	if (error.code === 1) {
		var html = `<h2> Come on! Give me your location. </h2>`;
		$("body").append(html);
	}

}