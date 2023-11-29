import { COLOR_FORMATS, DIFFICULTIES } from "./color-game.ts";

const resultsElement = document.querySelector(".results");
const colorElement = document.querySelector(".form #color-selector");
const difficultyElement = document.querySelector(".form #difficulty-selector");
const colorDisplay = document.querySelector(".color-string");

let colorFormat = COLOR_FORMATS.RGB;
let difficulty = DIFFICULTIES.EASY;

onStart();

function onStart() {
	toggleResult();
	setupEventListeners();
}

function setupEventListeners() {
	if (colorDisplay == null) return;
	colorElement?.addEventListener("change", (e) => {
		const target = <HTMLInputElement>e.target;
		colorFormat = target.id;
		colorDisplay.textContent = colorFormat;
		//TODO regenerate colors
		console.log(colorFormat);
	});
	difficultyElement?.addEventListener("change", (e) => {
		const target = <HTMLInputElement>e.target;
		difficulty = target.id;
		//TODO regenerate colors
		console.log(difficulty);
	});
}

function toggleResult() {
	resultsElement?.classList.toggle("hide");
}
