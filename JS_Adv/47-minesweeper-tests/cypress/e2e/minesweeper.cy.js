import { TILE_STATUSES } from "../../minesweeper";

describe("User clicks on a tile", () => {
	it("it is not a mine", () => {
		cy.visitBoard([
			[
				{ x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		]);
		cy.get('[data-x="1"][data-y="0"]').click();
		cy.get('[data-x="1"][data-y="0"]').should("have.text", "1");
	});
	it("it is a mine and reveals all other mines", () => {
		cy.visitBoard([
			[
				{ x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: true },
				{ x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		]);
		cy.get('[data-x="0"][data-y="1"]').click();
		cy.get('[data-x="0"][data-y="1"]').should("have.attr", "data-status", TILE_STATUSES.MINE);
		cy.get('[data-x="0"][data-y="0"]').should("have.attr", "data-status", TILE_STATUSES.MINE);
		cy.get(".subtext").should("have.text", "You Lose");

		//all other input blocked
		cy.get('[data-x="1"][data-y="0"]').click();
		cy.get('[data-x="1"][data-y="0"]').should("have.attr", "data-status", TILE_STATUSES.HIDDEN);
	});
	it("it is a right click and it's not already marked", () => {
		cy.visitBoard([
			[
				{ x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		]);
		cy.get('[data-x="0"][data-y="1"]').rightclick();
		cy.get('[data-x="0"][data-y="1"]').should("have.attr", "data-status", TILE_STATUSES.MARKED);
		cy.get(".subtext").should("contain", "Mines Left: 0");
	});
	it("it is a right click and is is already marked", () => {
		cy.visitBoard([
			[
				{ x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 0, y: 1, status: TILE_STATUSES.MARKED, mine: true },
			],
			[
				{ x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
				{ x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
			],
		]);
		cy.get(".subtext").should("contain", "Mines Left: 0");
		cy.get('[data-x="0"][data-y="1"]').rightclick();
		cy.get('[data-x="0"][data-y="1"]').should("have.attr", "data-status", TILE_STATUSES.HIDDEN);
		cy.get(".subtext").should("contain", "Mines Left: 1");
	});
});
