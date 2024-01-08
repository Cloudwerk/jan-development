import TodoList from "./TodoList";

function App() {
	return (
		<>
			<div className="filter-form">
				<div className="filter-form-group">
					<label htmlFor="name">Name</label>
					<input type="text" id="name" value="" />
				</div>
				<label>
					<input type="checkbox" />
					Hide Completed
				</label>
			</div>
			<TodoList />
		</>
	);
}

export default App;
