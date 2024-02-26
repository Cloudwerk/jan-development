import { Todo } from "./models";

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
    renderTodo({
      name: input.value,
      isDone: false,
      id: new Date().valueOf().toString(),
    });
    input.value = "";
  });
}

function renderTodo(todo: Todo) {
  if (!list) return;
  const listItem = document.createElement("li");
  listItem.classList.add("list-item");

  const label = document.createElement("label");
  label.classList.add("list-item-label");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.isDone;
  checkbox.classList.add("label-input");

  const span = document.createElement("span");
  span.textContent = todo.name;

  const button = document.createElement("button");
  button.classList.add("delete-btn");
  button.textContent = "Delete";
  button.addEventListener("click", () => {
    listItem.remove();
  });

  label.append(checkbox, span);
  listItem.append(label, button);
  list.append(listItem);
}
