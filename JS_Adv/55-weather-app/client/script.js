import axios from "axios";
import { fromUnixTime, format } from "date-fns";

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

function renderCurrentWeather(currentWeatherObject) {
	setValue("[data-current-temp]", currentWeatherObject.currentTemp);
	setValue("[date-current-description]", currentWeatherObject.description);
	setWeatherIcon("[current-weather-icon]", currentWeatherObject.icon, true);
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

function renderHourlyWeather(hourlyWeatherArray) {
	const hourSection = document.querySelector(".hour-section tbody");
	const template = document.querySelector("#hour-row-template");
	hourSection.innerHTML = "";

	hourlyWeatherArray.forEach((hour) => {
		const { timestamp, icon, temp, tempFeelsLike, wind, precip } = hour;
		const time = fromUnixTime(timestamp);
		const element = template.content.cloneNode(true);
		setValue(".time-display .weekday", format(time, "eeee"), { parent: element });
		setValue(".time-display [data-time]", format(time, "HH:mm"), { parent: element });
		setWeatherIcon(".weather-icon", icon, false, { parent: element });
		setValue("[data-temp]", temp, { parent: element });
		setValue("[data-fl-temp]", tempFeelsLike, { parent: element });
		setValue("[data-wind]", wind, { parent: element });
		setValue("[data-precip]", precip, { parent: element });
		hourSection.appendChild(element);
	});
}

function setValue(selector, value, { parent = document } = {}) {
	parent.querySelector(selector).textContent = value;
}

function setWeatherIcon(selector, icon, isLarge = false, { parent = document } = {}) {
	parent.querySelector(selector).src = getIconUrl(icon, isLarge);
}

function getIconUrl(icon, large = false) {
	const size = large ? "@2x" : "";
	return `http://openweathermap.org/img/wn/${icon}${size}.png`;
}

function setDailyCardValues(parentQuery, { unixTimestamp, average: averageTemperature, icon }) {
	const currentDay = fromUnixTime(unixTimestamp);
	setValue(`${parentQuery} .day-card-date`, format(currentDay, "eeee"));
	setValue(`${parentQuery} .temperature-display`, averageTemperature);
	setWeatherIcon(`${parentQuery} .weather-icon`, icon);
}
