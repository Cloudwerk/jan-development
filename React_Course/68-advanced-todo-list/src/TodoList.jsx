import { useEffect, useState } from "react";
import "./styles.css";
import { TodoItem } from "./TodoItem";

function TodoList() {
	const [newTodoName, setNewTodoName] = useState("");
	const [todos, setTodos] = useState([]);
	const TODOS_KEY = "TODOS";

	useEffect(() => {
		const localItems = localStorage.getItem(TODOS_KEY);
		if (localItems == null) return;
		setTodos(JSON.parse(localItems));
	}, []);

	function addNewTodo() {
		if (newTodoName === "") return;

		setTodos((currentTodos) => {
			const newTodos = [...currentTodos, { name: newTodoName, completed: false, id: crypto.randomUUID() }];
			localStorage.setItem(TODOS_KEY, JSON.stringify(newTodos));
			return newTodos;
		});
		setNewTodoName("");
	}

	function toggleTodo(todoId, completed) {
		setTodos((currentTodos) => {
			const doneItems = currentTodos.map((todo) => {
				if (todo.id === todoId) return { ...todo, completed };

				return todo;
			});
			localStorage.setItem(TODOS_KEY, JSON.stringify(doneItems));
			return doneItems;
		});
	}

	function deleteTodo(todoId) {
		setTodos((currentTodos) => {
			const newItems = currentTodos.filter((todo) => todo.id !== todoId);
			localStorage.setItem(TODOS_KEY, JSON.stringify(newItems));
			return newItems;
		});
	}

	return (
		<>
			<ul id="list">
				{todos.map((todo) => {
					return <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />;
				})}
			</ul>

			<div id="new-todo-form">
				<label htmlFor="todo-input">New Todo</label>
				<input type="text" id="todo-input" value={newTodoName} onChange={(e) => setNewTodoName(e.target.value)} />
				<button onClick={addNewTodo}>Add Todo</button>
			</div>
		</>
	);
}

export default TodoList;
