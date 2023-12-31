import { COLOR_FORMATS, DIFFICULTIES, Color } from "./color-game";
import { clamp, getRandomIntInRange, shuffleArray } from "./utils";

const resultsElement = <HTMLDivElement>document.querySelector(".results");
const colorElement = <HTMLFieldSetElement>document.querySelector(".form #color-selector");
const difficultyElement = <HTMLFieldSetElement>document.querySelector(".form #difficulty-selector");
const colorDisplay = <HTMLHeadingElement>document.querySelector(".color-string");
const colorGrid = <HTMLDivElement>document.querySelector(".color-grid");
const tileTemplate = <HTMLTemplateElement>document.querySelector("#color-tile-template");
const tileCorrectTemplate = <HTMLTemplateElement>document.querySelector("#color-tile-right");

let colorFormat = COLOR_FORMATS.RGB;
let difficulty = DIFFICULTIES.EASY;
let NR_OF_TILES = 6;

let mainColor = createRandomColor();
updateColorDisplay(COLOR_FORMATS.RGB, mainColor);

onStart();

function onStart() {
	toggleResult();
	setupEventListeners();

	resetTiles();
}

function resetTiles() {
	mainColor = createRandomColor();
	updateColorDisplay(colorFormat, mainColor);
	removeOldTiles();
	generateTiles();
}

function setupEventListeners() {
	if (colorDisplay == null) return;
	colorElement.addEventListener("change", (e) => {
		const target = <HTMLInputElement>e.target;
		mainColor = createRandomColor();
		colorFormat = target.value;
		updateColorDisplay(colorFormat, mainColor);

		resetTiles();
	});
	difficultyElement.addEventListener("change", (e) => {
		const target = <HTMLInputElement>e.target;
		difficulty = target.value;
		mainColor = createRandomColor();
		updateColorDisplay(colorFormat, mainColor);

		resetTiles();
	});
}

function removeOldTiles() {
	colorGrid.textContent = "";
}

function generateTiles() {
	const tiles = Array<Color>();
	for (let i = 0; i < NR_OF_TILES - 1; i++) {
		tiles.push(deriveColorWithDifficulty(mainColor, difficulty));
	}
	tiles.push(mainColor);

	const shuffledTiles = <Array<Color>>shuffleArray(tiles);
	shuffledTiles.forEach((tile) => {
		if (tile.getColors().hex === mainColor.getColors().hex) {
			const templateClone = <HTMLElement>tileCorrectTemplate.content.cloneNode(true);
			const tileButton = <HTMLButtonElement>templateClone.querySelector("button");

			tileButton.style.backgroundColor = mainColor.getColors().hex;
			tileButton.addEventListener("click", win);

			colorGrid.appendChild(templateClone);
		} else {
			const templateClone = <HTMLElement>tileTemplate.content.cloneNode(true);
			const tileButton = <HTMLButtonElement>templateClone.querySelector("button");

			tileButton.style.backgroundColor = tile.getColors().hex;
			tileButton.addEventListener("click", lose);

			colorGrid.appendChild(templateClone);
		}
	});
}

function win() {
	toggleResult();
	const resultText = <HTMLDivElement>resultsElement.querySelector("div");
	const resultButton = <HTMLButtonElement>resultsElement.querySelector("button");
	resultText.textContent = "Correct";

	colorGrid.addEventListener("click", stopProp, { capture: true });
	resultButton.addEventListener("click", nextColorCallback);
}

function lose() {
	toggleResult();
	const resultText = <HTMLDivElement>resultsElement.querySelector("div");
	const resultButton = <HTMLButtonElement>resultsElement.querySelector("button");
	resultText.textContent = "Wrong";

	colorGrid.addEventListener("click", stopProp, { capture: true });
	resultButton.addEventListener("click", nextColorCallback);
}

function nextColorCallback() {
	colorGrid.removeEventListener("click", stopProp, { capture: true });
	toggleResult();
	resetTiles();

	const resultButton = <HTMLButtonElement>resultsElement.querySelector("button");
	resultButton.removeEventListener("click", nextColorCallback);
}

function updateColorDisplay(colorFormat: string, color: Color) {
	if (colorDisplay == null) return;
	const colorValues = color.getColors();

	switch (colorFormat) {
		case COLOR_FORMATS.RGB:
			colorDisplay.textContent = `rgb(${colorValues.rgb.red}, ${colorValues.rgb.green}, ${colorValues.rgb.blue})`;
			break;
		case COLOR_FORMATS.HEX:
			colorDisplay.textContent = `hex(${colorValues.hex})`;
			break;
		case COLOR_FORMATS.HSL:
			colorDisplay.textContent = `hsl(${colorValues.hsl.hue}, ${colorValues.hsl.sat}, ${colorValues.hsl.light})`;
			break;
		default:
			colorDisplay.textContent = "internal error, please refresh the page";
			break;
	}
}

function deriveRandomColorWithOffset(offset: number, startColor: Color) {
	const startingColors = startColor.getColors();
	const rgbMin = 0,
		rgbMax = 255;

	const min = {
		red: startingColors.rgb.red - offset,
		green: startingColors.rgb.green - offset,
		blue: startingColors.rgb.blue - offset,
	};

	const max = {
		red: startingColors.rgb.red + offset,
		green: startingColors.rgb.green + offset,
		blue: startingColors.rgb.blue + offset,
	};

	return new Color(
		getRandomIntInRange(clamp(rgbMin, rgbMax, min.red), clamp(rgbMin, rgbMax, max.red)),
		getRandomIntInRange(clamp(rgbMin, rgbMax, min.green), clamp(rgbMin, rgbMax, max.green)),
		getRandomIntInRange(clamp(rgbMin, rgbMax, min.blue), clamp(rgbMin, rgbMax, max.blue))
	);
}

function deriveColorWithDifficulty(startColor: Color, difficulty: string) {
	switch (difficulty) {
		case DIFFICULTIES.EASY:
			return deriveRandomColorWithOffset(75, startColor);
		case DIFFICULTIES.MEDIUM:
			return deriveRandomColorWithOffset(50, startColor);
		case DIFFICULTIES.HARD:
			return deriveRandomColorWithOffset(25, startColor);
		default:
			return deriveRandomColorWithOffset(0, startColor);
	}
}

function createRandomColor() {
	const min = 0,
		max = 255;
	return new Color(getRandomIntInRange(min, max), getRandomIntInRange(min, max), getRandomIntInRange(min, max));
}

function toggleResult() {
	resultsElement.classList.toggle("hide");
}

function stopProp(e) {
	e.stopImmediatePropagation();
}
