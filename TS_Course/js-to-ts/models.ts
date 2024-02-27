export type Position = {
	x: number;
	y: number;
};

export type MineStatus = "hidden" | "mine" | "number" | "marked";

export type Mine = {
	mine: boolean;
	status: MineStatus;
} & Position;
