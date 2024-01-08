import { useEffect, useReducer, useState } from "react";
import "./styles.css";
import { TodoItem } from "./TodoItem";

const TODOS_KEY = "TODOS";
const ACTIONS = {
	ADD_TODO: "ADD_TODO",
	TOGGLE_TODO: "TOGGLE_TODO",
	REMOVE_TODO: "REMOVE_TODO",
	SET_ALL: "SET_ALL",
};

function reducer(todos, action) {
	switch (action.type) {
		case ACTIONS.ADD_TODO:
			const newTodos = [...todos, action.payload.item];
			localStorage.setItem(TODOS_KEY, JSON.stringify(newTodos));
			return newTodos;

		case ACTIONS.TOGGLE_TODO:
			const doneItems = todos.map((todo) => {
				if (todo.id === action.payload.id) return { ...todo, completed: action.payload.completed };
				return todo;
			});

			localStorage.setItem(TODOS_KEY, JSON.stringify(doneItems));
			return doneItems;

		case ACTIONS.REMOVE_TODO:
			const newItems = todos.filter((todo) => todo.id !== action.payload.id);
			localStorage.setItem(TODOS_KEY, JSON.stringify(newItems));
			return newItems;
		case ACTIONS.SET_ALL:
			const localItems = localStorage.getItem(TODOS_KEY);
			if (localItems == null) return;
			return JSON.parse(localItems);
	}
}

function TodoList() {
	const [newTodoName, setNewTodoName] = useState("");
	const [todos, dispatch] = useReducer(reducer, []);

	useEffect(() => {
		dispatch({ type: ACTIONS.SET_ALL });
	}, []);

	function addNewTodo() {
		if (newTodoName === "") return;

		dispatch({
			type: ACTIONS.ADD_TODO,
			payload: { item: { name: newTodoName, completed: false, id: crypto.randomUUID() } },
		});
		setNewTodoName("");
	}

	function toggleTodo(todoId, completed) {
		dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todoId, completed: completed } });
	}

	function deleteTodo(todoId) {
		dispatch({ type: ACTIONS.REMOVE_TODO, payload: { id: todoId } });
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
