import { Link, useLoaderData } from "react-router-dom";
import { SinglePostLoaderReturn } from "../utils/types";
import { CommentCard } from "./components/CommentCard";

export function Post() {
	const { userData, commentData, data: post } = useLoaderData() as SinglePostLoaderReturn;
	return (
		<>
			<h1 className="page-title">{post.title}</h1>
			<span className="page-subtitle">
				By: <Link to={`/Users/${post.userId}`}>{userData.name}</Link>
			</span>
			<div>{post.body}</div>
			<h3 className="mt-4 mb-2">Comments</h3>
			<div className="card-stack">
				{commentData.map((comment) => {
					return <CommentCard key={crypto.randomUUID()} {...comment} />;
				})}
			</div>
		</>
	);
}
