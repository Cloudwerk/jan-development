import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../utils/useFetch";
import { IUserFetchReturn } from "../utils/types";

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
				<div className="card">
					<div className="card-header">sunt aut facere repellat provident occaecati excepturi optio reprehenderit</div>
					<div className="card-body">
						<div className="card-preview-text">
							quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam
							nostrum rerum est autem sunt rem eveniet architecto
						</div>
					</div>
					<div className="card-footer">
						<a className="btn" href="posts.html">
							View
						</a>
					</div>
				</div>
				<div className="card">
					<div className="card-header">qui est esse</div>
					<div className="card-body">
						<div className="card-preview-text">
							est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis
							voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla
						</div>
					</div>
					<div className="card-footer">
						<a className="btn" href="posts.html">
							View
						</a>
					</div>
				</div>
				<div className="card">
					<div className="card-header">ea molestias quasi exercitationem repellat qui ipsa sit aut</div>
					<div className="card-body">
						<div className="card-preview-text">
							et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis
							pariatur molestiae porro eius odio et labore et velit aut
						</div>
					</div>
					<div className="card-footer">
						<a className="btn" href="posts.html">
							View
						</a>
					</div>
				</div>
				<div className="card">
					<div className="card-header">eum et est occaecati</div>
					<div className="card-body">
						<div className="card-preview-text">
							ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic
							commodi nesciunt rem tenetur doloremque ipsam iure quis sunt voluptatem rerum illo velit
						</div>
					</div>
					<div className="card-footer">
						<a className="btn" href="posts.html">
							View
						</a>
					</div>
				</div>
				<div className="card">
					<div className="card-header">nesciunt quas odio</div>
					<div className="card-body">
						<div className="card-preview-text">
							repudiandae veniam quaerat sunt sed alias aut fugiat sit autem sed est voluptatem omnis possimus esse
							voluptatibus quis est aut tenetur dolor neque
						</div>
					</div>
					<div className="card-footer">
						<a className="btn" href="posts.html">
							View
						</a>
					</div>
				</div>
				<div className="card">
					<div className="card-header">dolorem eum magni eos aperiam quia</div>
					<div className="card-body">
						<div className="card-preview-text">
							ut aspernatur corporis harum nihil quis provident sequi mollitia nobis aliquid molestiae perspiciatis et
							ea nemo ab reprehenderit accusantium quas voluptate dolores velit et doloremque molestiae
						</div>
					</div>
					<div className="card-footer">
						<a className="btn" href="posts.html">
							View
						</a>
					</div>
				</div>
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
