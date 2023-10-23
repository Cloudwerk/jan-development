const cardElements = Array.from(document.querySelectorAll(`.card`));
const cards = [];

class Card {
	constructor(btn, body, isShow) {
		this.btn = btn;
		this.body = body;
		this.isShow = isShow;
	}
}

cardElements.forEach((card, index) => {
	addElement(card, index);
});

function addElement(card, index) {
	const btn = card.querySelector(`.expand-button`);
	const body = card.querySelector(`.card-body`);

	cards.push(
		new Card(btn, body, body.classList.contains("show") ? true : false)
	);

	btn.addEventListener(`click`, (e) => {
		renderCards(cards[index]);
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
		card.isShow = true;
	}
}
