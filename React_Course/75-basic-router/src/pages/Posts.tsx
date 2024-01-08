import { useEffect } from "react";
import { useFetch } from "../utils/useFetch";
import { IPostObject, IUseFetchPostReturn } from "../utils/types";
import { PostCard } from "./components/PostCard";

export function Posts() {
	const { data: fetchData, isError, isLoading }: IUseFetchPostReturn = useFetch("http://localhost:3000/posts");

	useEffect(() => {
		if (!isLoading) return;
		console.log(JSON.stringify(fetchData, null, 2), isError);
	}, [fetchData, isLoading]);

	// return <p>{isLoading ? "Loading..." : JSON.stringify(fetchData, null, 2)}</p>;
	return (
		<div className="container">
			<h1 className="page-title">Posts</h1>
			<div className="card-grid">
				{isLoading ? (
					"Loading..."
				) : (
					<>
						{fetchData?.map((entry: IPostObject) => {
							return <PostCard title={entry.title} body={entry.body} id={entry.id}></PostCard>;
						})}
					</>
				)}
			</div>
		</div>
	);
}
