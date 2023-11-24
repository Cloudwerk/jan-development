import { describe } from "node:test";
import {
	TILE_STATUSES,
	createBoard,
	markTile,
	revealTile,
	checkWin,
	checkLose,
	positionMatch,
	markedTilesCount,
} from "./minesweeper.js";

describe("#createBoard", () => {
	test("it creates a valid board", () => {
		const boardSize = 2;
		const minePositions = [{ x: 0, y: 1 }];
		const expectedBoard = [
			[
				{ x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		];
		const board = createBoard(boardSize, minePositions);
		expect(board).toEqual(expectedBoard);
	});
});

describe("#markedTilesCount", () => {
	test("it returns the correct count of marked tiles", () => {
		const board = [
			[
				{ x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 0, y: 1, status: TILE_STATUSES.MARKED, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.MARKED, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		];
		const count = markedTilesCount(board);
		expect(count).toBe(2);
	});

	test("it returns 0 when there are no marked tiles", () => {
		const board = [
			[
				{ x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		];
		const count = markedTilesCount(board);
		expect(count).toBe(0);
	});
});

describe("#markTile", () => {
	test("mark", () => {
		const board = [
			[
				{ x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		];
		const expectedBoard = [
			[
				{ x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 0, y: 1, status: TILE_STATUSES.MARKED, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		];
		expect(markTile(board, { x: 0, y: 1 })).toEqual(expectedBoard);
	});
	test("unmark a tile", () => {
		const board = [
			[
				{ x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 0, y: 1, status: TILE_STATUSES.MARKED, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		];
		const expectedBoard = [
			[
				{ x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		];
		expect(markTile(board, { x: 0, y: 1 })).toEqual(expectedBoard);
	});
	test("already revealed", () => {
		const board = [
			[
				{ x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 0, y: 1, status: TILE_STATUSES.NUMBER, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		];
		const expectedBoard = [
			[
				{ x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 0, y: 1, status: TILE_STATUSES.NUMBER, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		];
		expect(markTile(board, { x: 0, y: 1 })).toEqual(expectedBoard);
	});
});

describe("#revealTile", () => {
	test("reveal a number tile", () => {
		const board = [
			[
				{ x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		];
		const expectedBoard = [
			[
				{
					adjacentMinesCount: 1,
					x: 0,
					y: 0,
					status: TILE_STATUSES.NUMBER,
					mine: false,
				},
				{ x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		];
		expect(revealTile(board, { x: 0, y: 0 })).toEqual(expectedBoard);
	});
	test("tile already revealed", () => {
		const board = [
			[
				{
					adjacentMinesCount: 1,
					x: 0,
					y: 0,
					status: TILE_STATUSES.NUMBER,
					mine: false,
				},
				{ x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		];
		const expectedBoard = [
			[
				{
					adjacentMinesCount: 1,
					x: 0,
					y: 0,
					status: TILE_STATUSES.NUMBER,
					mine: false,
				},
				{ x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		];
		expect(revealTile(board, { x: 0, y: 0 })).toEqual(expectedBoard);
	});
	test("tile is a mine", () => {
		const board = [
			[
				{ x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		];
		const expectedBoard = [
			[
				{ x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 0, y: 1, status: TILE_STATUSES.MINE, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		];
		expect(revealTile(board, { x: 0, y: 1 })).toEqual(expectedBoard);
	});
	test("reveal adjacent tiles", () => {
		const board = [
			[
				{ x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 0, y: 2, status: TILE_STATUSES.HIDDEN, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 2, status: TILE_STATUSES.HIDDEN, mine: false },
			],
			[
				{ x: 2, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 2, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 2, y: 2, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		];
		const expectedBoard = [
			[
				{
					adjacentMinesCount: 0,
					x: 0,
					y: 0,
					status: TILE_STATUSES.NUMBER,
					mine: false,
				},
				{
					adjacentMinesCount: 1,
					x: 0,
					y: 1,
					status: TILE_STATUSES.NUMBER,
					mine: false,
				},
				{ x: 0, y: 2, status: TILE_STATUSES.HIDDEN, mine: true },
			],
			[
				{
					adjacentMinesCount: 0,
					x: 1,
					y: 0,
					status: TILE_STATUSES.NUMBER,
					mine: false,
				},
				{
					adjacentMinesCount: 1,
					x: 1,
					y: 1,
					status: TILE_STATUSES.NUMBER,
					mine: false,
				},
				{
					adjacentMinesCount: 1,
					x: 1,
					y: 2,
					status: TILE_STATUSES.NUMBER,
					mine: false,
				},
			],
			[
				{
					adjacentMinesCount: 0,
					x: 2,
					y: 0,
					status: TILE_STATUSES.NUMBER,
					mine: false,
				},
				{
					adjacentMinesCount: 0,
					x: 2,
					y: 1,
					status: TILE_STATUSES.NUMBER,
					mine: false,
				},
				{
					adjacentMinesCount: 0,
					x: 2,
					y: 2,
					status: TILE_STATUSES.NUMBER,
					mine: false,
				},
			],
		];
		expect(revealTile(board, { x: 0, y: 0 })).toEqual(expectedBoard);
	});
});

describe("#checkWin", () => {
	test("won", () => {
		const board = [
			[
				{ x: 0, y: 0, status: TILE_STATUSES.NUMBER, mine: false },
				{ x: 0, y: 1, status: TILE_STATUSES.MARKED, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.NUMBER, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.NUMBER, mine: false },
			],
		];
		expect(checkWin(board)).toBe(true);
	});
	test("lost", () => {
		const board = [
			[
				{ x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 0, y: 1, status: TILE_STATUSES.MINE, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		];
		expect(checkWin(board)).toBe(false);
	});
});

describe("#checkLose", () => {
	test("won", () => {
		const board = [
			[
				{ x: 0, y: 0, status: TILE_STATUSES.NUMBER, mine: false },
				{ x: 0, y: 1, status: TILE_STATUSES.MARKED, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.NUMBER, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.NUMBER, mine: false },
			],
		];
		expect(checkLose(board)).toBe(false);
	});
	test("lost", () => {
		const board = [
			[
				{ x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 0, y: 1, status: TILE_STATUSES.MINE, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		];
		expect(checkLose(board)).toBe(true);
	});
});
