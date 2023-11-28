const fromUnixTime = require("date-fns/fromUnixTime");
const isSameDay = require("date-fns/isSameDay");
const add = require("date-fns/add");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// const weatherData = require("./example.json")

app.get("/weather", (req, res) => {
	const { lat, lon } = req.query;
	axios
		.get(`https://api.openweathermap.org/data/2.5/forecast`, {
			params: {
				lat,
				lon,
				units: "metric",
				appid: process.env.API_KEY,
			},
		})
		.then(({ data }) => {
			res.json({
				daily: parseDailyWeather(data),
				current: parseCurrentWeather(data),
				hourly: parseHourlyWeather(data),
				data,
			});
		})
		.catch((e) => {
			console.log(e);
			res.sendStatus(500);
		});
});

app.listen(3001);

function parseDailyWeather({ list }) {
	const dayOne = fromUnixTime(list[0].dt);
	const dayTwo = add(dayOne, { days: 1 });
	const dayThree = add(dayTwo, { days: 1 });
	const dayFour = add(dayThree, { days: 1 });
	const dayFive = add(dayFour, { days: 1 });
	return {
		today: calculateDailyAverageAndIcon(dayOne, list),
		tomorrow: calculateDailyAverageAndIcon(dayTwo, list),
		thirdDay: calculateDailyAverageAndIcon(dayThree, list),
		fourthDay: calculateDailyAverageAndIcon(dayFour, list),
		fifthDay: calculateDailyAverageAndIcon(dayFive, list),
	};
}

function calculateDailyAverageAndIcon(day, list) {
	const sameDayWeather = list.filter((entry) => isSameDay(fromUnixTime(entry.dt), day));
	if (sameDayWeather.length > 0)
		return {
			average: Math.round(
				sameDayWeather.reduce(function (avg, value, _, { length }) {
					return avg + value.main.temp / length;
				}, 0)
			),
			flHigh: Math.round(Math.max(...sameDayWeather.map((e) => e.main.feels_like))),
			flLow: Math.round(Math.min(...sameDayWeather.map((e) => e.main.feels_like))),
			unixTimestamp: sameDayWeather[0].dt,
			icon: sameDayWeather[0].weather[0].icon,
		};
	else return null;
}

function parseCurrentWeather({ list }) {
	const { main, weather, wind, pop } = list[0];
	return {
		currentTemp: Math.round(main.temp),
		highTemp: Math.round(main.temp_max),
		lowTemp: Math.round(main.temp_min),
		highFeelsLike: "missing",
		lowFeelslike: "missing",
		windSpeed: Math.round(wind.speed),
		precip: Math.round(pop * 100),
		icon: weather[0].icon,
		description: weather[0].description,
	};
}

function parseHourlyWeather({ list }) {
	const nextEightStamps = list.slice(0, 8);
	// const returnValues = [];
	// nextEightStamps.forEach((element) => {
	// 	returnValues.push({
	// 		timestamp: element.dt,
	// 		icon: element.weather[0].icon,
	// 		temp: element.main.temp,
	// 		tempFeelsLike: element.main.feels_like,
	// 		wind: element.wind.speed,
	// 		precip: element.pop,
	// 	});
	// });
	// return returnValues;

	return nextEightStamps.map((element) => {
		return {
			timestamp: element.dt,
			icon: element.weather[0].icon,
			temp: Math.round(element.main.temp),
			tempFeelsLike: Math.round(element.main.feels_like),
			wind: Math.round(element.wind.speed),
			precip: element.pop * 100,
		};
	});
}
