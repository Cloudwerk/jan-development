import { Await, useLoaderData } from "react-router-dom";
import { getPosts } from "../api/posts";
import { getTodos } from "../api/todos";
import { getUser } from "../api/users";
import { PostCard } from "../components/PostCard";
import { TodoItem } from "../components/TodoItem";
import { Suspense } from "react";
import { CardsFallback } from "../components/SkeletonCard";

function User() {
	const { user, posts, todos } = useLoaderData();

	return (
		<>
			<Suspense fallback={<UserFallback />}>
				<Await resolve={user}>
					{(user) => (
						<>
							<h1 className="page-title">{user.name}</h1>
							<div className="page-subtitle">{user.email}</div>
							<div>
								<b>Company:</b> {user.company.name}
							</div>
							<div>
								<b>Website:</b> {user.website}
							</div>
							<div>
								<b>Address:</b> {user.address.street} {user.address.suite} {user.address.city} {user.address.zipcode}
							</div>
						</>
					)}
				</Await>
			</Suspense>

			<h3 className="mt-4 mb-2">Posts</h3>
			<div className="card-grid">
				<Suspense fallback={<CardsFallback amount={6} />}>
					<Await resolve={posts}>{(posts) => posts.map((post) => <PostCard key={post.id} {...post} />)}</Await>
				</Suspense>
			</div>
			<h3 className="mt-4 mb-2">Todos</h3>
			<ul>
				<Suspense
					fallback={Array(10)
						.fill(null)
						.map((_, index) => {
							return <li className="skeleton" key={`todo-skeleton-${index}`} />;
						})}
				>
					<Await resolve={todos}>{(todos) => todos.map((todo) => <TodoItem key={todo.id} {...todo} />)}</Await>
				</Suspense>
			</ul>
		</>
	);
}

function UserFallback() {
	return (
		<>
			<h1 className="page-title skeleton" />
			<div className="page-subtitle skeleton" />
			<div className="skeleton" />
			<div className="skeleton" />
			<div className="skeleton" />
		</>
	);
}

function loader({ request: { signal }, params: { userId } }) {
	const posts = getPosts({ signal, params: { userId } });
	const todos = getTodos({ signal, params: { userId } });
	const user = getUser(userId, { signal });

	return { posts, todos, user };
}

export const userRoute = {
	loader,
	element: <User />,
};
