import { ITodoObject } from "../utils/types";
import { Todo } from "./components/Todo";
import { useLoaderData } from "react-router-dom";

const NR_OF_TODOS = 25;

export function Todos() {
	const todoData = useLoaderData() as Array<ITodoObject>;
	return (
		<>
			<h1 className="page-title">Todos</h1>
			<ul>
				{todoData!.slice(0, NR_OF_TODOS).map((todo: ITodoObject) => {
					return <Todo key={crypto.randomUUID()} {...todo} />;
				})}
			</ul>
		</>
	);
}
