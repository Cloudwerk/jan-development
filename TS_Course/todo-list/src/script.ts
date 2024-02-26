const form = document.querySelector<HTMLFormElement>("#new-todo-form");
const input = document.querySelector<HTMLInputElement>("#todo-input");
const list = document.querySelector<HTMLUListElement>("#list");

setupEventListeners();

function setupEventListeners() {
  if (!form || !input || !list) {
    alert("error while quering the DOM elements");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value === "") return;
    const listItem = document.createElement("li");
    listItem.classList.add("list-item");

    const label = document.createElement("label");
    label.classList.add("list-item-label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("label-input");

    const span = document.createElement("span");
    span.textContent = input.value;

    const button = document.createElement("button");
    button.classList.add("delete-btn");
    button.textContent = "Delete";
    button.addEventListener("click", () => {
      listItem.remove();
    });

    label.append(checkbox, span);
    listItem.append(label, button);
    list.append(listItem);

    input.value = "";
  });
}
