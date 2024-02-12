import { Await, Link, defer, useLoaderData } from "react-router-dom";
import { getComments } from "../api/comments";
import { getPost } from "../api/posts";
import { getUser } from "../api/users";
import { Suspense } from "react";
import { CommentsFallback } from "../components/SkeletonCard";

function Post() {
	const { comments, post, user } = useLoaderData();

	return (
		<>
			<Suspense fallback={<SkeletonPost />}>
				<Await resolve={post}>
					{(post) => (
						<>
							<h1 className="page-title">
								{post.title}
								<div className="title-btns">
									<Link className="btn btn-outline" to="edit">
										Edit
									</Link>
								</div>
							</h1>
							<span className="page-subtitle">
								<Suspense fallback={<div className="skeleton"></div>}>
									<Await resolve={user}>
										{(user) => (
											<>
												By: <Link to={`/users/${user.id}`}>{user.name}</Link>
											</>
										)}
									</Await>
								</Suspense>
							</span>
							<div>{post.body}</div>
						</>
					)}
				</Await>
			</Suspense>

			<h3 className="mt-4 mb-2">Comments</h3>
			<div className="card-stack">
				<Suspense fallback={<CommentsFallback />}>
					<Await resolve={comments}>
						{(comments) =>
							comments.map((comment) => (
								<div key={comment.id} className="card">
									<div className="card-body">
										<div className="text-sm mb-1">{comment.email}</div>
										{comment.body}
									</div>
								</div>
							))
						}
					</Await>
				</Suspense>
			</div>
		</>
	);
}

function SkeletonPost() {
	return (
		<>
			<h1 className="page-title">
				<div className="skeleton"></div>
				<div className="skeleton"></div>
				<div className="title-btns">
					<div className="skeleton skeleton-btn" />
				</div>
			</h1>
			<span className="page-subtitle">
				<div className="skeleton"></div>
			</span>
			<div className="skeleton"></div>
			<div className="skeleton"></div>
		</>
	);
}

function loader({ request: { signal }, params: { postId } }) {
	const post = getPost(postId, { signal });
	const comments = getComments(postId, { signal });

	return defer({ comments, post, user: post.then((post) => getUser(post.userId, { signal })) });
}

export const postRoute = {
	loader,
	element: <Post />,
};
