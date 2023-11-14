import mapboxgl, { LngLatLike } from "mapbox-gl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
require("dotenv").config();

setupMap();
setupAnimations();
setupSmoothScroll();

function setupMap() {
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
}

function setupAnimations() {
	const search = document.querySelector("#search");

	//Reveal
	gsap.utils.toArray(".reveal").forEach(function (elem: any, index: number) {
		ScrollTrigger.create({
			trigger: elem,
			start: "top 80%",
			end: "bottom 10%",
			// markers: true,
			onEnter: function () {
				gsap.fromTo(
					elem,
					{ autoAlpha: 0 },
					{
						duration: 1.25,
						autoAlpha: 1,
						ease: "back",
						overwrite: "auto",
						delay: index * 0.25,
					}
				);
			},
			onLeave: function () {
				gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
			},
			onEnterBack: function () {
				gsap.fromTo(
					elem,
					{ autoAlpha: 0 },
					{
						duration: 1.25,
						autoAlpha: 1,
						ease: "back",
						overwrite: "auto",
					}
				);
			},
			onLeaveBack: function () {
				gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
			},
		});
	});
}

function setupSmoothScroll() {
	const navButtons = document.querySelectorAll(".nav-btn");

	if (navButtons.length > 0) {
		navButtons.forEach((btn: Element, index: number) => {
			btn.addEventListener("click", () => {
				gsap.to(window, { duration: 1, scrollTo: { y: "#section" + (index + 1), offsetY: 70 }, ease: "power4" });
			});
		});
	}

	const scrollUpBtn = document.querySelector(".scroll-up-btn");

	if (scrollUpBtn != null) {
		scrollUpBtn.addEventListener("click", () => {
			gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: "power4" });
		});
	}
}
