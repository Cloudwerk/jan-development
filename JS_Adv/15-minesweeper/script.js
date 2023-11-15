const board = document.querySelector(".board");
const minesLeftDisplay = document.querySelector(".subtext");
const gridSize = 10;
const elements = [];
let numberOfMines = 0;

for (let i = 0; i < gridSize * gridSize; i++) {
	const newElement = document.createElement("div");
	newElement.dataset.status = "hidden";
	const isMine = decideMine();
	newElement.dataset.isMine = `${isMine}`;

	board?.appendChild(newElement);
	elements.push({ isMine: isMine, isHidden: true, element: newElement, hasNumber: false, isMarked: false });

	setupLeftClickEventListener(i);
	setupRightClickEventListener(i);
}
setMinesLeftText();

for (let i = 0; i < 100; i++) {
	setNumbers(i);
}

function setupLeftClickEventListener(index) {
	elements[index].element.addEventListener("click", (e) => {
		if (elements[index].isMarked) return;
		if (elements[index].isMine) {
			elements[index].element.dataset.status = "mine";
			triggerGameOver();
		} else {
			elements[index].element.dataset.status = "number";
			elements[index].isHidden = false;
			if (!elements[index].hasNumber) {
				revealAllValidNeighbors(index);
			}
		}
	});
}
function setupRightClickEventListener(index) {
	elements[index].element.addEventListener("contextmenu", (e) => {
		e.preventDefault();
		if (elements[index].element.dataset.status == "hidden" && numberOfMines > 0) {
			elements[index].element.dataset.status = "marked";
			elements[index].isMarked = true;
			numberOfMines--;
			setMinesLeftText();
		} else if (elements[index].element.dataset.status == "marked") {
			elements[index].element.dataset.status = "hidden";
			elements[index].isMarked = false;
			numberOfMines++;
			setMinesLeftText();
		}
	});
}

function triggerGameOver() {
	//figure out a way to block all input
}

function setNumbers(index) {
	if (elements[index].isMine) return;
	let number = 0;
	number += checkNeighborForMine(index, index - 11);
	number += checkNeighborForMine(index, index - 10);
	number += checkNeighborForMine(index, index - 9);
	number += checkNeighborForMine(index, index - 1);
	number += checkNeighborForMine(index, index + 1);
	number += checkNeighborForMine(index, index + 9);
	number += checkNeighborForMine(index, index + 10);
	number += checkNeighborForMine(index, index + 11);
	if (number > 0) {
		elements[index].element.textContent = `${number}`;
		elements[index].hasNumber = true;
	}
	/*
		-11 -10   -9
		-1 active +1
		+9  +10  +11
	*/
}
function checkNeighborForMine(index, neighbor) {
	if (isNeighborIndexValid(index, neighbor)) {
		if (checkMine(neighbor)) {
			return 1;
		} else {
			return 0;
		}
	}
	return 0;
}

function revealAllValidNeighbors(index) {
	revealValidNeighbor(index, index - 10);
	revealValidNeighbor(index, index - 1);
	revealValidNeighbor(index, index + 1);
	revealValidNeighbor(index, index + 10);
}

function revealValidNeighbor(index, neighbor) {
	if (!isNeighborIndexValidForReveal(index, neighbor)) return;
	//not mine, not marked, not number
	if (
		elements[neighbor].isHidden &&
		!(elements[neighbor].isMine || elements[neighbor].hasNumber || elements[neighbor].isMarked)
	) {
		elements[neighbor].element.dataset.status = "number";
		elements[neighbor].isHidden = false;
		revealAllValidNeighbors(neighbor);
	} else if (
		elements[neighbor].isHidden &&
		!(elements[neighbor].isMine || elements[neighbor].isMarked) &&
		elements[neighbor].hasNumber
	) {
		elements[neighbor].element.dataset.status = "number";
		elements[neighbor].isHidden = false;
	}
}

function isNeighborIndexValidForReveal(index, neighbor) {
	if (neighbor < 0 || neighbor > 99) return false;
	if (index % 10 === 0 && neighbor === index - 1) return false;
	if ((index % 10 === 9 || index === 9) && neighbor === index + 1) return false;
	return true;
	/*
		- 	-10 	-
		-1 active	+1
		- 	+10 	-

	*/
}

function isNeighborIndexValid(index, neighbor) {
	if (neighbor < 0 || neighbor > 99) {
		return false;
	}
	if (index % 10 === 0 && (neighbor === index - 1 || neighbor === index + 9 || neighbor === index - 11)) {
		return false;
	}
	if (
		(index % 10 === 9 || index === 9) &&
		(neighbor === index + 1 || neighbor > index + 11 || neighbor === index - 9)
	) {
		return false;
	}
	return true;
	//links 0 10 20...
	//rechts 9 19....
	//oben 1-9
	//unten > 99
}

function checkMine(index) {
	if (elements[index].isMine) {
		return true;
	} else {
		return false;
	}
}

function setMinesLeftText() {
	if (minesLeftDisplay != null) minesLeftDisplay.textContent = `Mines Left: ${numberOfMines}`;
}

function decideMine() {
	//decide mine or not
	const randomNumber = Math.floor(Math.random() * 100);
	if (randomNumber < 9) {
		numberOfMines++;
		return true;
	} else return false;
}
