import { ReactElement } from "react";

interface IitemObject {
	item: string;
	children: ReactElement;
}

export function ListItem({ item, children }: IitemObject) {
	return (
		<li className="list-item">
			<label className="list-item-label">
				<input type="checkbox" data-list-item-checkbox></input>
				<span data-list-item-text>{item + " "}</span>
			</label>
			{children}
		</li>
	);
}
