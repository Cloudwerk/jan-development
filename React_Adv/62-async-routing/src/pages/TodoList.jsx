import { Await, defer, useLoaderData } from "react-router-dom";
import { getTodos } from "../api/todos";
import { TodoItem } from "../components/TodoItem";
import { Suspense } from "react";

function TodoList() {
	const { data: todos } = useLoaderData();

	return (
		<>
			<h1 className="page-title">Todos</h1>
			<ul>
				<Suspense
					fallback={Array(50)
						.fill(null)
						.map((_, index) => {
							return <li className="skeleton" key={`skeleton-todo-${index}`}></li>;
						})}
				>
					<Await resolve={todos}>{(todos) => todos.map((todo) => <TodoItem key={todo.id} {...todo} />)}</Await>
				</Suspense>
			</ul>
		</>
	);
}

function loader({ request: { signal } }) {
	return defer({ data: getTodos({ signal }) });
}

export const todoListRoute = {
	loader,
	element: <TodoList />,
};
