import { COLOR_FORMATS, DIFFICULTIES, Color, clamp } from "./color-game";

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

function deriveRandomColorWithOffset(offset: number, startColor: Color) {
  const startingColors = startColor.getColors();
  const rgbMin = 0,
    rgbMax = 255;
  const min = {
    red: startingColors.rgb.red - offset,
    green: startingColors.rgb.red - offset,
    blue: startingColors.rgb.blue - offset,
  };
  const max = {
    red: startingColors.rgb.red + offset,
    green: startingColors.rgb.red + offset,
    blue: startingColors.rgb.blue + offset,
  };
  return new Color(
    getRandomInt(
      clamp(rgbMin, rgbMax, min.red),
      clamp(rgbMin, rgbMax, max.red)
    ),
    getRandomInt(
      clamp(rgbMin, rgbMax, min.green),
      clamp(rgbMin, rgbMax, max.green)
    ),
    getRandomInt(
      clamp(rgbMin, rgbMax, min.blue),
      clamp(rgbMin, rgbMax, max.blue)
    )
  );
}

function deriveColorWithDifficulty(startColor: Color, difficulty: string) {
  switch (difficulty) {
    case DIFFICULTIES.EASY:
      return deriveRandomColorWithOffset(50, startColor);
    case DIFFICULTIES.MEDIUM:
      return deriveRandomColorWithOffset(25, startColor);
    case DIFFICULTIES.HARD:
      return deriveRandomColorWithOffset(10, startColor);
    default:
      return deriveRandomColorWithOffset(0, startColor);
  }
}

function createRandomColor() {
  const min = 0,
    max = 255;
  return new Color(
    getRandomInt(min, max),
    getRandomInt(min, max),
    getRandomInt(min, max)
  );
}

function toggleResult() {
  resultsElement?.classList.toggle("hide");
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
