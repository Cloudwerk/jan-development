import { COLOR_FORMATS, DIFFICULTIES } from "./color-game.ts";

const resultsElement = document.querySelector(".results");
const colorElement = document.querySelector(".form #color-selector");
const difficultyElement = document.querySelector(".form #difficulty-selector");

let colorFormat = COLOR_FORMATS.RGB;
let difficulty = DIFFICULTIES.EASY;

onStart();

function onStart() {
	toggleResult();
	setupEventListeners();
}

function setupEventListeners() {
	colorElement?.addEventListener("change", (e) => {
		const target = <HTMLInputElement>e.target;
		colorFormat = target.id;
		console.log(colorFormat);
	});
	difficultyElement?.addEventListener("change", (e) => {
		const target = <HTMLInputElement>e.target;
		difficulty = target.id;
		console.log(difficulty);
	});
}

function toggleResult() {
	resultsElement?.classList.toggle("hide");
}
