import { useLoaderData } from "react-router-dom";
import { SingleUserLoaderReturn } from "../utils/types";
import { PostCard } from "./components/PostCard";
import { Todo } from "./components/Todo";

export function User() {
	const { userData, postsData, todosData } = useLoaderData() as SingleUserLoaderReturn;

	return (
		<>
			<h1 className="page-title">{userData.name}</h1>
			<div className="page-subtitle">{userData.email}</div>
			<div>
				<b>Company:</b> {userData.company.name}
			</div>
			<div>
				<b>Website:</b> {userData.website}
			</div>
			<div>
				<b>Address:</b>{" "}
				{`${userData.address.street} ${userData.address.suite}, ${userData.address.city}, ${userData.address.zipcode}`}
			</div>
			<h3 className="mt-4 mb-2">Posts</h3>
			<div className="card-grid">
				{postsData.map((post) => {
					return <PostCard key={crypto.randomUUID()} {...post} />;
				})}
			</div>
			<h3 className="mt-4 mb-2">Todos</h3>
			{
				<ul>
					{todosData.map((todo) => {
						return <Todo key={crypto.randomUUID()} {...todo} />;
					})}
				</ul>
			}
		</>
	);
}
