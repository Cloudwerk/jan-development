import { Link, useParams } from "react-router-dom";
import { ICommentsFetchReturn, IUseFetchPostReturn } from "../utils/types";
import { useFetch } from "../utils/useFetch";
import { useEffect, useState } from "react";
import { CommentCard } from "./components/CommentCard";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export function Post() {
	const { PostId } = useParams();
	const [postNumber, setPostNumber] = useState(0);

	if (!PostId) return <h1>Invalid Post ID!</h1>;
	useEffect(() => {
		setPostNumber(parseInt(PostId));
	}, []);
	if (postNumber == null) return <h1>Invalid Post ID!</h1>;
	const {
		data: fetchData,
		isError,
		isLoading,
	}: IUseFetchPostReturn = useFetch(`${API_URL}/posts/${postNumber.toString()}`);
	const {
		data: commentsData,
		isError: commentsIsError,
		isLoading: commentsIsLoading,
	}: ICommentsFetchReturn = useFetch(`${API_URL}/posts/${postNumber.toString()}/comments`);

	return (
		<div className="container">
			{isLoading ? (
				"Loading..."
			) : isError ? (
				"There has been an Error!"
			) : (
				<>
					<h1 className="page-title">{fetchData!.title}</h1>
					<span className="page-subtitle">
						By: <Link to={`/Users/${fetchData!.userId}`}>Leanne Graham</Link>
					</span>
					<div>{fetchData!.body}</div>
					<h3 className="mt-4 mb-2">Comments</h3>
					<div className="card-stack">
						{commentsIsLoading
							? "Loading..."
							: commentsIsError
							? "There has been an Error!"
							: commentsData!.map((comment) => {
									return <CommentCard {...comment} />;
							  })}
					</div>
				</>
			)}
		</div>
	);
}
