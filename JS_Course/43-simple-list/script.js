const itemForm = document.querySelector(`#new-item-form`);
const list = document.querySelector(`#list`);
const input = document.querySelector("#item-input");

itemForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const newItem = document.createElement("div");
	newItem.innerText = input.value;
	newItem.classList.add("list-item");
	list.appendChild(newItem);
	input.value = "";

	newItem.addEventListener("click", () => {
		newItem.remove();
	});
});
