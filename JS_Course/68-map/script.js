require("dotenv").config();
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
console.log(MAPBOX_ACCESS_TOKEN);

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
// const map = new mapboxgl.Map({
// 	container: "map",
// 	style: "mapbox://styles/mapbox/streets-v11",
// });

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
	enableHighAccuracy: true,
});

function setupMap(centerPosition) {
	const map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/streets-v11",
		center: centerPosition,
		zoom: 13,
	});
}

function successLocation(position) {
	setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
	setupMap([7.428171, 49.049461]);
}
