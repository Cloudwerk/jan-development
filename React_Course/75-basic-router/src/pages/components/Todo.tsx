import { ITodoObject } from "../../utils/types";

export function Todo({ title, completed }: ITodoObject) {
	return <li className={completed ? "strike-through" : ""}>{title}</li>;
}
