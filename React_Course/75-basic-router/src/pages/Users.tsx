import { useFetch } from "../utils/useFetch";
import { IUserObject, IUseFetchUsersReturn } from "../utils/types";
import { UserCard } from "./components/UserCard";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export function Users() {
	const { data: usersData, isError, isLoading }: IUseFetchUsersReturn = useFetch(`${API_URL}/users`);
	return (
		<div className="container">
			<h1 className="page-title">Users</h1>
			<div className="card-grid">
				{isLoading ? (
					"Loading..."
				) : isError ? (
					"There has been an Error!"
				) : (
					<>
						{usersData!.map((user: IUserObject) => {
							return <UserCard key={crypto.randomUUID()} {...user} />;
						})}
					</>
				)}
			</div>
		</div>
	);
}
