import { IUserObject } from "../../utils/types";

interface IUsersSelectorArgs {
	defaultValue: number;
	users: Array<IUserObject>;
}

export function UserSelector({ defaultValue, users }: IUsersSelectorArgs) {
	return (
		<div className="form-group">
			<label htmlFor="userId">Author</label>
			<select name="userId" id="userId" defaultValue={defaultValue}>
				{users.map((user) => {
					return (
						<option value={user.id} key={crypto.randomUUID()}>
							{user.name}
						</option>
					);
				})}
			</select>
		</div>
	);
}
