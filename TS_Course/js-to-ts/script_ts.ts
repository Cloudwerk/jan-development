// Display/UI

import {
	TILE_STATUSES,
	createBoard,
	markTile,
	revealTile,
	checkWin,
	checkLose,
	positionMatch,
	markedTilesCount,
} from "./minesweeper_ts";
import { Position, Tile } from "./models.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 10;

let board = createBoard(BOARD_SIZE, getMinePositions(BOARD_SIZE, NUMBER_OF_MINES));
const boardElement = document.querySelector<HTMLDivElement>(".board");
const minesLeftText = document.querySelector<HTMLDivElement>("[data-mine-count]");
const messageText = document.querySelector<HTMLHeadingElement>(".subtext");

function render() {
	if (!boardElement) {
		alert("No Board Element Found");
		return;
	}
	boardElement.innerHTML = "";
	checkGameEnd();

	getTileElements().forEach((element) => {
		boardElement.append(element);
	});

	listMinesLeft();
}

function getTileElements(): HTMLDivElement[] {
	return board.flatMap((row) => {
		return row.map(tileToElement);
	});
}

function tileToElement(tile: Tile): HTMLDivElement {
	const element = document.createElement("div");
	element.dataset.status = tile.status;
	element.dataset.x = tile.x.toString();
	element.dataset.y = tile.y.toString();
	element.textContent = tile.adjacentMinesCount?.toString() || "";
	return element;
}

boardElement?.addEventListener("click", (e) => {
	if (!e.target) return;
	if (!e.target.matches("[data-status]")) return;

	board = revealTile(board, {
		x: parseInt(e.target.dataset.x),
		y: parseInt(e.target.dataset.y),
	});
	render();
});

boardElement?.addEventListener("contextmenu", (e) => {
	if (!e.target) return;
	if (!e.target.matches("[data-status]")) return;

	e.preventDefault();
	board = markTile(board, {
		x: parseInt(e.target.dataset.x),
		y: parseInt(e.target.dataset.y),
	});
	render();
});

boardElement?.style.setProperty("--size", BOARD_SIZE);
render();

function listMinesLeft() {
	const text = (NUMBER_OF_MINES - markedTilesCount(board)).toString();
	minesLeftText ? (minesLeftText.textContent = text) : alert(text);
}

function checkGameEnd() {
	const win = checkWin(board);
	const lose = checkLose(board);

	if (win || lose) {
		boardElement?.addEventListener("click", stopProp, { capture: true });
		boardElement?.addEventListener("contextmenu", stopProp, { capture: true });
	}

	if (win) {
		messageText ? (messageText.textContent = "You Win") : alert("You Win");
	}
	if (lose) {
		messageText ? (messageText.textContent = "You Lose") : alert("You Lose");
		board.forEach((row) => {
			row.forEach((tile) => {
				if (tile.status === TILE_STATUSES.MARKED) board = markTile(board, tile);
				if (tile.mine) board = revealTile(board, tile);
			});
		});
	}
}

function stopProp(e) {
	e.stopImmediatePropagation();
}

function getMinePositions(boardSize: number, numberOfMines: number): Array<Position> {
	const positions: Array<Position> = [];

	while (positions.length < numberOfMines) {
		const position = {
			x: randomNumber(boardSize),
			y: randomNumber(boardSize),
		};

		if (!positions.some(positionMatch.bind(null, position))) {
			positions.push(position);
		}
	}

	return positions;
}

function randomNumber(size: number): number {
	return Math.floor(Math.random() * size);
}
