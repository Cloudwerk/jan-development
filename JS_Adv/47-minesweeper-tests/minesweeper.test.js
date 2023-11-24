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

// describe("#markTile", () => {
//     test("it is a mine", () => {
//         const board = [
// 			[
// 				{ x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
// 				{ x: 0, y: 1, status: TILE_STATUSES.MARKED, mine: true },
// 			],
// 			[
// 				{ x: 1, y: 0, status: TILE_STATUSES.MARKED, mine: false },
// 				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
// 			],
// 		];

//         expect(markTile(board, {x: 0, y: 1})).toEqual(expectedResult)
//     })
// })
