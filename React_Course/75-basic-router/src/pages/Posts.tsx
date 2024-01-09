import { useFetch } from "../utils/useFetch";
import { IPostObject, IUseFetchPostsReturn } from "../utils/types";
import { PostCard } from "./components/PostCard";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export function Posts() {
	const { data: fetchData, isError, isLoading }: IUseFetchPostsReturn = useFetch(`${API_URL}/posts`);

	return (
		<div className="container">
			<h1 className="page-title">Posts</h1>
			<div className="card-grid">
				{isLoading ? (
					"Loading..."
				) : isError ? (
					"There has been an Error!"
				) : (
					<>
						{fetchData!.map((entry: IPostObject) => {
							return (
								<PostCard key={crypto.randomUUID()} title={entry.title} body={entry.body} id={entry.id}></PostCard>
							);
						})}
					</>
				)}
			</div>
		</div>
	);
}
