import { Suspense, useEffect, useRef } from "react";
import { Await, Form, Link, defer, useLoaderData } from "react-router-dom";
import { getPosts } from "../api/posts";
import { getUsers } from "../api/users";
import { FormGroup } from "../components/FormGroup";
import { PostCard, SkeletonCard } from "../components/PostCard";

function PostList() {
	const {
		posts,
		users,
		searchParams: { query, userId },
	} = useLoaderData();
	const queryRef = useRef();
	const userIdRef = useRef();

	useEffect(() => {
		queryRef.current.value = query || "";
	}, [query]);

	useEffect(() => {
		userIdRef.current.value = userId || "";
	}, [userId]);

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

			<Form className="form mb-4">
				<div className="form-row">
					<FormGroup>
						<label htmlFor="query">Query</label>
						<input type="search" name="query" id="query" ref={queryRef} />
					</FormGroup>
					<FormGroup>
						<label htmlFor="userId">Author</label>
						<select type="search" name="userId" id="userId" ref={userIdRef}>
							<option value="">Any</option>
							<Suspense fallback={<div>Loading</div>}>
								<Await resolve={users}>
									{(users) =>
										users.map((user) => (
											<option key={user.id} value={user.id}>
												{user.name}
											</option>
										))
									}
								</Await>
							</Suspense>
						</select>
					</FormGroup>
					<button className="btn">Filter</button>
				</div>
			</Form>

			<div className="card-grid">
				<Suspense fallback={<SkeletonCard />}>
					<Await resolve={posts}>{(posts) => posts.map((post) => <PostCard key={post.id} {...post} />)}</Await>
				</Suspense>
			</div>
		</>
	);
}

function CardsFallback() {
	return (
		<>
			{Array(10)
				.fill(null)
				.map((_) => {
					return <SkeletonCard />;
				})}
		</>
	);
}

function loader({ request: { signal, url } }) {
	const searchParams = new URL(url).searchParams;
	const query = searchParams.get("query");
	const userId = searchParams.get("userId");
	const filterParams = { q: query };
	if (userId !== "") filterParams.userId = userId;

	const posts = getPosts({ signal, params: filterParams });
	const users = getUsers({ signal });

	return {
		posts,
		users,
		searchParams: { query, userId },
	};
}

export const postListRoute = {
	loader,
	element: <PostList />,
};
