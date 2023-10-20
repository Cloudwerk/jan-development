const KEY = "EXPAND_COLLAPSE";

const cardElements = Array.from(document.querySelectorAll(`.card`));
const cards = [];

class Card {
	constructor(btn, body, isShow, title) {
		this.btn = btn;
		this.body = body;
		this.isShow = isShow;
		this.title = title;
	}
}

cardElements.forEach((card, index) => {
	addElement(card, index);
});

function addElement(card, index) {
	const btn = card.querySelector(`.expand-button`);
	const body = card.querySelector(`.card-body`);
	const title = card.querySelector(`span`).innerText;

	for (let i = 0; i < cards.length; i++) {
		if (card.title != title) continue;
		card.btn = btn;
		card.body = body;
		renderCards(cards[i]);
		return;
	}

	cards.push(
		new Card(btn, body, body.classList.contains("show") ? true : false, title)
	);
	btn.addEventListener(`click`, (e) => {
		renderCards(cards[index]);
		// if (cards[index].isShow) {
		// 	body.classList.remove("show");
		// 	btn.textContent = "Expand";
		// 	cards[index].isShow = false;
		// } else {
		// 	body.classList.add("show");
		// 	btn.textContent = "Collapse";
		// 	cards[index].isShow = true;
		// }
	});
}

function renderCards(card) {
	if (card.isShow) {
		card.body.classList.remove("show");
		card.btn.textContent = "Expand";
		card.isShow = false;
	} else {
		card.body.classList.add("show");
		card.btn.textContent = "Collapse";
		cards.isShow = true;
	}
}

function saveCards() {
	localStorage.clear();
	localStorage.setItem(KEY, JSON.stringify(cards));
}

function getCards() {
	let string = localStorage.getItem(KEY);
	return JSON.parse(string) || [];
}
