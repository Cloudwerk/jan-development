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
				appid: process.env.API_KEY,
			},
		})
		.then(({ data }) => {
			res.json(data);
		})
		.catch((e) => {
			console.log(e);
			res.sendStatus(500);
		});
});

app.listen(3001);
