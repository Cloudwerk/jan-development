const form = document.querySelector<HTMLFormElement>("#new-todo-form");
const input = document.querySelector<HTMLInputElement>("#todo-input");
const list = document.querySelector<HTMLUListElement>("#list");
const template = document.querySelector<HTMLTemplateElement>("#todo-template");

setupEventListeners();

function setupEventListeners() {
  if (!form || !input || !list || !template) {
    alert("error while quering the DOM elements");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("here");
  });
}
