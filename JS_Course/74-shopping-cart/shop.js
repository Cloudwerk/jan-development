import shopItems from "./items.json" assert { type: "json" };

const shoppingCartButton = document.querySelector("#shoppingCartButton");
const shoppingCartContent = document.querySelector("#shoppingCartContent");
const shopItemsFlexContainer = document.querySelector(".flex.flex-wrap.-m-4");

let itemsInShoppingCart = loadCartFromStorage();

shoppingCartButton.addEventListener("click", () => {
	shoppingCartContent.classList.toggle("invisible");
});

function initialiseSite() {
	if (document.title === "Store") setupShop();
	updateCart();
	saveCartToStorage();
}

initialiseSite();

function setupShop() {
	const shopItemTemplate = document.querySelector("#shopItemTemplate");
	shopItemsFlexContainer.innerHTML = "";
	shopItems.forEach((item) => {
		let cartItem = itemsInShoppingCart.find((itemInArray) => {
			return itemInArray.id == item.id;
		});
		if (cartItem == null) {
			itemsInShoppingCart.push({
				id: item.id,
				price: item.priceCents,
				color: item.imageColor,
				itemName: item.name,
				amount: 0,
			});
		} else {
			(cartItem.price = item.priceCents), (cartItem.color = item.imageColor);
			cartItem.name = item.name;
		}
		const newItem = shopItemTemplate.content.cloneNode(true);

		const img = newItem.querySelector("img");
		img.src = `https://dummyimage.com/420x260/${item.imageColor}/${item.imageColor}`;

		const itemCategory = newItem.querySelector("h3");
		itemCategory.innerHTML = item.category;

		const itemName = newItem.querySelector("h2");
		itemName.innerHTML = item.name;

		const itemPrice = newItem.querySelector("p");
		const itemPriceStrnLength = item.priceCents.toString().length;
		itemPrice.innerHTML = `$${item.priceCents.toString().slice(0, itemPriceStrnLength - 2)}.${item.priceCents
			.toString()
			.slice(itemPriceStrnLength - 2, itemPriceStrnLength)}`;

		const addToCartButton = newItem.querySelector("button");
		addToCartButton.addEventListener("click", () => {
			let itemInCart = itemsInShoppingCart.find((itemInArray) => {
				return itemInArray.id == item.id;
			});
			itemInCart.amount++;
			updateCart();
		});

		shopItemsFlexContainer.appendChild(newItem);
	});
}

function updateTotal() {
	const totalPrice = shoppingCartContent.querySelector("#total");
	let total = 0;
	let totalItemAmount = 0;
	itemsInShoppingCart.forEach((item) => {
		total += item.price * item.amount;
		totalItemAmount += item.amount;
	});
	const totalStrnLength = total.toString().length;
	totalPrice.innerHTML = `$${total.toString().slice(0, totalStrnLength - 2)}.${total
		.toString()
		.slice(totalStrnLength - 2, totalStrnLength)}`;

	updateShoppingCartNumber(totalItemAmount);
}

function updateCart() {
	const shoppingCartItemList = shoppingCartContent.querySelector("#shoppingCartItemList");
	shoppingCartItemList.innerHTML = "";
	const itemTemplate = document.querySelector("#shoppingCartItemTemplate");
	let totalItems = 0;
	itemsInShoppingCart.forEach((item) => {
		if (item.amount == 0) return;
		totalItems += item.amount;
		let newItem = itemTemplate.content.cloneNode(true);

		const nameDisplay = newItem.querySelector("h2");
		nameDisplay.innerHTML = item.itemName;

		const itemCount = newItem.querySelector("span");
		if (item.amount > 1) {
			itemCount.innerHTML = `x${item.amount}`;
		} else {
			itemCount.innerHTML = "";
		}

		const img = newItem.querySelector("img");
		img.src = `https://dummyimage.com/210x130/${item.color}/${item.color}`;

		const priceDisplay = newItem.querySelector(".price-display-cart");
		let priceInCents = item.amount * item.price;
		let priceLength = priceInCents.toString().length;
		priceDisplay.innerHTML = `$${priceInCents.toString().slice(0, priceLength - 2)}.${priceInCents
			.toString()
			.slice(priceLength - 2, priceLength)}`;

		const buttonRemove = newItem.querySelector("button");
		buttonRemove.addEventListener("click", () => {
			item.amount = 0;
			updateCart();
		});

		shoppingCartItemList.appendChild(newItem);
	});

	// won't be called when removing item, if it is called further down
	saveCartToStorage();

	if (totalItems == 0) {
		shoppingCartContent.classList.toggle("invisible");
		shoppingCartButton.classList.toggle("invisible");
		return;
	} else if (shoppingCartContent.classList.contains("invisible")) {
		shoppingCartContent.classList.toggle("invisible");
		shoppingCartButton.classList.toggle("invisible");
	}
	updateTotal();
}

function updateShoppingCartNumber(totalItemAmount) {
	const numberDisplay = shoppingCartButton.querySelector("div");
	numberDisplay.innerHTML = totalItemAmount;
}

function saveCartToStorage() {
	localStorage.setItem("SHOP_TEST_CART", JSON.stringify(itemsInShoppingCart));
}

function loadCartFromStorage() {
	let items = localStorage.getItem("SHOP_TEST_CART");
	return JSON.parse(items) || [];
}
