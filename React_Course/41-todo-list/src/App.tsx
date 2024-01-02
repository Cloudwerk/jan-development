import { useState } from "react";
import "./styles.css";

function AddNewListItem() {}

function App() {
	const [items, setItems] = useState(Array<string>);
	let newItemName = "";
	// console.log(items);

	return (
		<>
			<div id="new-todo-form">
				<label htmlFor="todo-input">New Todo</label>
				<input
					type="text"
					id="todo-input"
					onChange={(evt) => {
						newItemName = evt.target.value;
					}}
				/>
				<button
					onClick={() => {
						if (newItemName == "") return;
						setItems([...items, newItemName]);
					}}
				>
					Add Todo
				</button>
			</div>
		</>
	);
}

export default App;
