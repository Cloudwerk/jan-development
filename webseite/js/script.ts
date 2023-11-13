import mapboxgl, { LngLatLike } from "mapbox-gl";

require("dotenv").config();
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN || "";

// console.log("API token: " + MAPBOX_ACCESS_TOKEN);

const CLOUDWERK_COORDS = new mapboxgl.LngLat(10.3301409, 47.7623819);

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/streets-v11",
	center: CLOUDWERK_COORDS,
	zoom: 14,
});
const nav = new mapboxgl.NavigationControl({ showZoom: true, showCompass: false });
map.addControl(nav, "top-right");

const marker1 = new mapboxgl.Marker({ color: "#007681" }).setLngLat(CLOUDWERK_COORDS).addTo(map);

//This section exists solely bc prettier does not like the html notation of these symbols
const scrollUpBtn = document.querySelector(".scroll-up-btn");
const facebookBtn = document.querySelector(".btn-social.facebook");
const instagramBtn = document.querySelector(".btn-social.instagram");
const githubBtn = document.querySelector(".btn-social.github");

if (scrollUpBtn != null) {
	scrollUpBtn.textContent = "\uF148";
}

if (facebookBtn != null && instagramBtn != null && githubBtn != null) {
	facebookBtn.textContent = "\uF344";
	instagramBtn.textContent = "\uF437";
	githubBtn.textContent = "\uF3ED";
}
