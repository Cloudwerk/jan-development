import { IUserObject } from "../utils/types";
import { UserCard } from "./components/UserCard";
import { useLoaderData } from "react-router-dom";

export function Users() {
	const usersData = useLoaderData() as Array<IUserObject>;
	return (
		<>
			<h1 className="page-title">Users</h1>
			<div className="card-grid">
				{usersData.map((user: IUserObject) => {
					return <UserCard key={crypto.randomUUID()} {...user} />;
				})}
			</div>
		</>
	);
}
