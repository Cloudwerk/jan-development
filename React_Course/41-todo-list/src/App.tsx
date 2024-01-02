import { useState } from "react";
import "./styles.css";
import { ListItem } from "./ListItem";

function App() {
	const [items, setItems] = useState(Array<string>);
	let newItemName = "";
	// console.log(items);

	return (
		<>
			<ul id="list">
				{items.map((item: string) => {
					return (
						<>
							<ListItem item={item}>
								<button onClick={() => setItems(items.slice(0, -1))} data-button-delete>
									Delete
								</button>
							</ListItem>
						</>
					);
				})}
			</ul>
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
