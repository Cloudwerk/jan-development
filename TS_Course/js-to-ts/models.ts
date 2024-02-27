export type Position = {
	x: number;
	y: number;
};

export type MineStatus = "hidden" | "mine" | "number" | "marked";

export type Tile = {
	mine: boolean;
	status: MineStatus;
	adjacentMinesCount?: number;
} & Position;
