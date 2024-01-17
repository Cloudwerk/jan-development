import { IPostObject } from "../utils/types";
import { PostCard } from "./components/PostCard";
import { Link, useLoaderData } from "react-router-dom";

export function Posts() {
	const posts = useLoaderData() as Array<IPostObject>;

	return (
		<>
			<h1 className="page-title">
				Posts
				<div className="title-btns">
					<Link className="btn btn-outline" to="new">
						New
					</Link>
				</div>
			</h1>
			<div className="card-grid">
				{posts.map((entry: IPostObject) => {
					return <PostCard key={crypto.randomUUID()} title={entry.title} body={entry.body} id={entry.id}></PostCard>;
				})}
			</div>
		</>
	);
}
