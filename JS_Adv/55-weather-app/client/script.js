import axios from "axios";

navigator.geolocation.getCurrentPosition(positionSuccess, positionError);

function positionSuccess({ coords }) {
	getWeather(coords.latitude, coords.longitude);
}

function positionError() {
	alert("We couldn't get your location. Please allow us to read your location to get accurate weather data");
}

function getWeather(lat, lon) {
	try {
		axios.get(`http://localhost:3001/weather`, { params: { lat, lon } }).then((res) => {
			console.log(res.data);
		});
	} catch (err) {
		console.error(err);
	}
}
