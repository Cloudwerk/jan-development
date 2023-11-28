import axios from "axios";
import { fromUnixTime } from "date-fns";

navigator.geolocation.getCurrentPosition(positionSuccess, positionError);

function positionSuccess({ coords }) {
	getWeather(coords.latitude, coords.longitude);
}

function positionError() {
	alert("We couldn't get your location. Please allow us to read your location to get accurate weather data");
}

function getWeather(lat, lon) {
	axios
		.get(`http://localhost:3001/weather`, { params: { lat, lon } })
		.then((res) => {
			console.log(res.data);
			renderWeather(res.data);
		})
		.catch((e) => {
			console.error(e);
			alert("Error getting Weather");
		});
}

function renderWeather({ current, daily, hourly }) {
	document.body.classList.remove("blurred");
	renderCurrentWeather(current);
	renderDailyWeather(daily);
	renderHourlyWeather(hourly);
}

function setValue(selector, value) {
	const element = document.querySelector(selector);
	element.textContent = value;
}

function setWeatherIcon(selector, icon) {
	const element = document.querySelector(selector);
	element.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

function renderCurrentWeather(currentWeatherObject) {
	setValue("[data-current-temp]", currentWeatherObject.currentTemp);
	setValue("[date-current-description]", currentWeatherObject.description);
	setWeatherIcon("[current-weather-icon]", currentWeatherObject.icon);
	setValue("[data-current-high]", currentWeatherObject.highTemp);
	setValue("[data-current-wind]", currentWeatherObject.windSpeed);
	setValue("[data-current-low]", currentWeatherObject.lowTemp);

	setValue("[data-current-precip]", currentWeatherObject.precip);
}

function renderDailyWeather(dailyWeatherObject) {
	setValue("[data-current-fl-low]", dailyWeatherObject.today.flLow);
	setValue("[data-current-fl-high]", dailyWeatherObject.today.flHigh);
	setDailyCardValues("[data-tomorrow]", dailyWeatherObject.tomorrow);
	setDailyCardValues("[data-third-day]", dailyWeatherObject.thirdDay);
	setDailyCardValues("[data-fourth-day]", dailyWeatherObject.fourthDay);
	setDailyCardValues("[data-fifth-day]", dailyWeatherObject.fifthDay);
}

function setDailyCardValues(parentQuery, { unixTimestamp, average: averageTemperature, icon }) {
	const currentDay = fromUnixTime(unixTimestamp);
	setValue(`${parentQuery} .day-card-date`, getDayString(currentDay));
	setValue(`${parentQuery} .temperature-display`, averageTemperature);
	setWeatherIcon(`${parentQuery} .weather-icon`, icon);
}

function getDayString(date) {
	const day = date.getDay();
	switch (day) {
		case 0:
			return "Sunday";
		case 1:
			return "Monday";
		case 2:
			return "Tuesday";
		case 3:
			return "Wednesday";
		case 4:
			return "Thursday";
		case 5:
			return "Friday";
		case 6:
			return "Saturday";
	}
}

function renderHourlyWeather(hourlyWeatherObject) {}
