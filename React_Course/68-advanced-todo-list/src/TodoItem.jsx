import { useContext, useEffect, useState } from "react";
import { TodoListContext } from "./App";

export function TodoItem({ id, name, completed, toggleTodo, deleteTodo }) {
	const [isHide, setIsHide] = useState(false);
	const { filter, hideComplete } = useContext(TodoListContext);

	useEffect(() => {
		if (hideComplete.hideCompleted && completed) {
			setIsHide(true);
			return;
		}
		if (filter.filterWord !== "") {
			if (!name.includes(filter.filterWord)) {
				setIsHide(true);
				return;
			}
		}
		setIsHide(false);
	}, [filter.filterWord, hideComplete.hideCompleted]);

	return (
		<li className={`list-item ${isHide ? "hidden" : ""}`}>
			<label className="list-item-label">
				<input
					checked={completed}
					type="checkbox"
					data-list-item-checkbox
					onChange={(e) => toggleTodo(id, e.target.checked)}
				/>
				<span data-list-item-text>{name}</span>
			</label>
			<button onClick={() => deleteTodo(id)} data-button-delete>
				Delete
			</button>
		</li>
	);
}
