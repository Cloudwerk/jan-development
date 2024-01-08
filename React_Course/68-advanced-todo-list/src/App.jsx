import { createContext, useState } from "react";
import TodoList from "./TodoList";

export const TodoListContext = createContext();

function App() {
	const [filterWord, setFilterWord] = useState("");
	const [hideCompleted, setHideCompleted] = useState(false);

	return (
		<TodoListContext.Provider
			value={{ filter: { filterWord, setFilterWord }, hideComplete: { hideCompleted, setHideCompleted } }}
		>
			<div className="filter-form">
				<div className="filter-form-group">
					<label htmlFor="name">Name</label>
					<input type="text" id="name" value={filterWord} onChange={(e) => setFilterWord(e.target.value)} />
				</div>
				<label>
					<input type="checkbox" checked={hideCompleted} onChange={(e) => setHideCompleted(e.target.checked)} />
					Hide Completed
				</label>
			</div>
			<TodoList />
		</TodoListContext.Provider>
	);
}

export default App;
