import { useFetch } from "../utils/useFetch";
import { ITodoObject, IUseFetchTodosReturn } from "../utils/types";
import { Todo } from "./components/Todo";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const NR_OF_TODOS = 25;

export function Todos() {
	const { data: todoData, isError, isLoading }: IUseFetchTodosReturn = useFetch(`${API_URL}/todos`);
	return (
		<div className="container">
			<h1 className="page-title">Todos</h1>
			<ul>
				{isLoading
					? "Loading..."
					: isError
					? "There has been an Error!"
					: todoData!.slice(0, NR_OF_TODOS).map((todo: ITodoObject) => {
							return <Todo key={crypto.randomUUID()} {...todo} />;
					  })}
			</ul>
		</div>
	);
}
