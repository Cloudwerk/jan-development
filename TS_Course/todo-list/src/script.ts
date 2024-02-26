import { Todo } from "./models";

const form = document.querySelector<HTMLFormElement>("#new-todo-form");
const input = document.querySelector<HTMLInputElement>("#todo-input");
const list = document.querySelector<HTMLUListElement>("#list");

const STORAGE_KEY = "TODO_ITEMS";
const todos = getTodos();

renderAllTodos();
setupEventListeners();

function setupEventListeners() {
  if (!form || !input || !list) {
    alert("error while quering the DOM elements");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value === "") return;
    const newTodo = {
      name: input.value,
      isDone: false,
      id: new Date().valueOf().toString(),
    };
    addTodo(newTodo);

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
  checkbox.addEventListener("change", (e) => {
    if (e.target) {
      const target = e.target as HTMLInputElement;
      setIsDone(todo, target.checked);
    }
  });

  const span = document.createElement("span");
  span.textContent = todo.name;

  const button = document.createElement("button");
  button.classList.add("delete-btn");
  button.textContent = "Delete";
  button.addEventListener("click", () => {
    listItem.remove();
    removeTodo(todo);
  });

  label.append(checkbox, span);
  listItem.append(label, button);
  list.append(listItem);
}

function renderAllTodos() {
  todos.forEach((todo) => {
    renderTodo(todo);
  });
}

function setIsDone(todo: Todo, isDone: boolean) {
  const index = todos.findIndex((_todo) => _todo.id === todo.id);
  if (index === -1) {
    alert("error while setting todo status");
    return;
  }
  todos[index].isDone = isDone;
  setTodos();
}

function setTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function addTodo(todo: Todo) {
  todos.push(todo);
  renderTodo(todo);
  setTodos();
}

function removeTodo(todo: Todo) {
  const todoIndex = todos.findIndex((_todo) => _todo.id === todo.id);
  if (todoIndex === -1) {
    alert("error while deleting todo");
    return;
  }
  todos.splice(todoIndex, 1);
  setTodos();
}

function getTodos(): Array<Todo> {
  const storageItems = localStorage.getItem(STORAGE_KEY);
  if (!storageItems) return new Array<Todo>();
  const parsedItems = JSON.parse(storageItems);
  if (Array.isArray(parsedItems)) return parsedItems as Array<Todo>;
  return new Array<Todo>();
}
