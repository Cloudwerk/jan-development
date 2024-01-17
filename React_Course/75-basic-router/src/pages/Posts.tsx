import { useEffect, useRef } from "react";
import { IPostObject, IPostsAndUserLoaderReturn } from "../utils/types";
import { PostCard } from "./components/PostCard";
import { Form, Link, useLoaderData } from "react-router-dom";

export function Posts() {
	const {
		searchParams: { query, userId },
		data: { postsData, usersData },
	} = useLoaderData() as IPostsAndUserLoaderReturn;
	const queryRef = useRef<HTMLInputElement>(null);
	const userIdRef = useRef<HTMLSelectElement>(null);

	useEffect(() => {
		queryRef.current!.value = query;
		userIdRef.current!.value = userId;
	}, [query]);

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
			<Form method="get" action="/posts" className="form mb-4">
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="query">Query</label>
						<input type="search" name="query" id="query" ref={queryRef} />
					</div>
					<div className="form-group">
						<label htmlFor="userId">Author</label>
						<select typeof="search" name="userId" id="userId" ref={userIdRef}>
							<option value="">Any</option>
							{usersData.map((user) => {
								return (
									<option value={user.id} key={crypto.randomUUID()}>
										{user.name}
									</option>
								);
							})}
						</select>
					</div>
					<button className="btn">Filter</button>
				</div>
			</Form>
			<div className="card-grid">
				{postsData.map((entry: IPostObject) => {
					return <PostCard key={crypto.randomUUID()} title={entry.title} body={entry.body} id={entry.id}></PostCard>;
				})}
			</div>
		</>
	);
}
