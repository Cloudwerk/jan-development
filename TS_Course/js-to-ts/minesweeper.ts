import { times, range } from "lodash/fp";
import { Tile, MineStatus, Position } from "./models";

export const TILE_STATUSES = {
	HIDDEN: "hidden",
	MINE: "mine",
	NUMBER: "number",
	MARKED: "marked",
} as const;

export function createBoard(boardSize: number, minePositions: Array<Position>): Tile[][] {
	return times((x) => {
		return times((y) => {
			return {
				x,
				y,
				mine: minePositions.some(positionMatch.bind(null, { x, y })),
				status: TILE_STATUSES.HIDDEN,
			};
		}, boardSize);
	}, boardSize);
}

export function markedTilesCount(board: Tile[][]): number {
	return board.reduce((count, row) => {
		return count + row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length;
	}, 0);
}

export function markTile(board: Tile[][], { x, y }: Position): Tile[][] {
	const tile = board[x][y];
	if (tile.status !== TILE_STATUSES.HIDDEN && tile.status !== TILE_STATUSES.MARKED) {
		return board;
	}

	if (tile.status === TILE_STATUSES.MARKED) {
		return replaceTile(board, { x, y }, { ...tile, status: TILE_STATUSES.HIDDEN });
	} else {
		return replaceTile(board, { x, y }, { ...tile, status: TILE_STATUSES.MARKED });
	}
}

function replaceTile(board: Tile[][], position: Position, newTile: Tile): Tile[][] {
	return board.map((row, x) => {
		return row.map((tile, y) => {
			if (positionMatch(position, { x, y })) {
				return newTile;
			}
			return tile;
		});
	});
}

export function revealTile(board: Tile[][], { x, y }: Position): Tile[][] {
	const tile = board[x][y];
	if (tile.status !== TILE_STATUSES.HIDDEN) {
		return board;
	}

	if (tile.mine) {
		return replaceTile(board, { x, y }, { ...tile, status: TILE_STATUSES.MINE });
	}

	const adjacentTiles = nearbyTiles(board, tile);
	const mines = adjacentTiles.filter((t) => t.mine);
	const newBoard = replaceTile(
		board,
		{ x, y },
		{ ...tile, status: TILE_STATUSES.NUMBER, adjacentMinesCount: mines.length === 0 ? undefined : mines.length }
	);
	if (mines.length === 0) {
		return adjacentTiles.reduce((b, t) => {
			return revealTile(b, t);
		}, newBoard);
	}
	return newBoard;
}

export function checkWin(board: Tile[][]): boolean {
	return board.every((row) => {
		return row.every((tile) => {
			return (
				tile.status === TILE_STATUSES.NUMBER ||
				(tile.mine && (tile.status === TILE_STATUSES.HIDDEN || tile.status === TILE_STATUSES.MARKED))
			);
		});
	});
}

export function checkLose(board: Tile[][]): boolean {
	return board.some((row) => {
		return row.some((tile) => {
			return tile.status === TILE_STATUSES.MINE;
		});
	});
}

export function positionMatch(a: Position, b: Position): boolean {
	return a.x === b.x && a.y === b.y;
}

function nearbyTiles(board: Tile[][], { x, y }: Position): Tile[] {
	const offsets = range(-1, 2);

	return offsets
		.flatMap((xOffset) => {
			return offsets.map((yOffset) => {
				return board[x + xOffset]?.[y + yOffset];
			});
		})
		.filter((tile) => tile != null);
}
