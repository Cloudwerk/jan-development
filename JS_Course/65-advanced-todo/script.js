const form = document.querySelector(`#new-todo-form`);
const list = document.querySelector(`#list`);
const template = document.querySelector(`template`);

const KEY_PREFIX = "ADVANCED-TODO_LIST";
const TODOS_STORAGE_KEY = `${KEY_PREFIX}-todos`;
const todos = loadTodos();

todos.forEach(renderTodo);

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const input = form.querySelector(`input`);

	if (input.value === "") return;
	const newTodo = {
		name: input.value,
		complete: false,
		id: new Date().valueOf().toString(),
	};
	todos.push(newTodo);
	renderTodo(newTodo);
	saveTodos();
	input.value = "";
});

function renderTodo(todo) {
	const templateClone = template.content.cloneNode(true);
	const textElement = templateClone.querySelector(`[data-list-item-text]`);
	const checkbox = templateClone.querySelector(`[data-list-item-checkbox]`);
	textElement.innerText = todo.name;
	checkbox.checked = todo.complete;

	checkbox.addEventListener("change", (e) => {
		todos.find((item) => item.id === todo.id).complete = checkbox.checked;
		saveTodos();
	});

	const deleteBtn = templateClone.querySelector(`[data-button-delete]`);
	deleteBtn.addEventListener("click", () => {
		for (let i = 0; i < todos.length; i++) {
			if (todos[i].id === todo.id) {
				todos.splice(i, 1);
				saveTodos();
				break;
			}
		}

		deleteBtn.parentElement.remove();
	});

	list.appendChild(templateClone);
}

function loadTodos() {
	const todosString = localStorage.getItem(TODOS_STORAGE_KEY);
	return JSON.parse(todosString) || [];
}

function saveTodos() {
	localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
}
