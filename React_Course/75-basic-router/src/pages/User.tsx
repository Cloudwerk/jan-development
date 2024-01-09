import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../utils/useFetch";
import { IUseFetchPostsReturn, IUserFetchReturn } from "../utils/types";
import { PostCard } from "./components/PostCard";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export function User() {
	const { userID: id } = useParams();
	const [userID, setUserID] = useState(0);

	if (!id) return <h1>There has been an Error!</h1>;
	useEffect(() => {
		setUserID(parseInt(id));
	}, []);
	if (userID == null) return <h1>Invalid User ID!</h1>;

	const { data: fetchData, isError, isLoading }: IUserFetchReturn = useFetch(`${API_URL}/users/${userID}`);
	const {
		data: postsData,
		isError: postsIsError,
		isLoading: postsIsLoading,
	}: IUseFetchPostsReturn = useFetch(`${API_URL}/posts?userId=${userID}`);

	return (
		<div className="container">
			{isLoading ? (
				"Loading..."
			) : isError ? (
				"There has been an Error!"
			) : (
				<>
					<h1 className="page-title">{fetchData!.name}</h1>
					<div className="page-subtitle">{fetchData!.email}</div>
					<div>
						<b>Company:</b> {fetchData!.company.name}
					</div>
					<div>
						<b>Website:</b> {fetchData!.website}
					</div>
					<div>
						<b>Address:</b>{" "}
						{`${fetchData!.address.street} ${fetchData!.address.suite}, ${fetchData!.address.city}, ${
							fetchData!.address.zipcode
						}`}
					</div>
				</>
			)}
			<h3 className="mt-4 mb-2">Posts</h3>
			<div className="card-grid">
				{postsIsLoading
					? "Loading..."
					: postsIsError
					? "There has been an Error"
					: postsData!.map((post) => {
							return <PostCard {...post} />;
					  })}
			</div>
			<h3 className="mt-4 mb-2">Todos</h3>
			<ul>
				<li>delectus aut autem</li>
				<li>quis ut nam facilis et officia qui</li>
				<li>fugiat veniam minus</li>
				<li className="strike-through">et porro tempora</li>
				<li>laboriosam mollitia et enim quasi adipisci quia provident illum</li>
				<li>qui ullam ratione quibusdam voluptatem quia omnis</li>
				<li>illo expedita consequatur quia in</li>
				<li className="strike-through">quo adipisci enim quam ut ab</li>
			</ul>
		</div>
	);
}
