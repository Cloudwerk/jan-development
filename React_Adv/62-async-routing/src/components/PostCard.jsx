import { Link } from "react-router-dom";

export function PostCard({ id, title, body }) {
	return (
		<div className="card">
			<div className="card-header">{title}</div>
			<div className="card-body">
				<div className="card-preview-text">{body}</div>
			</div>
			<div className="card-footer">
				<Link className="btn" to={`/posts/${id}`}>
					View
				</Link>
			</div>
		</div>
	);
}

export function SkeletonCard() {
	return (
		<div className="card">
			<div className="card-header">
				<div className="skeleton"></div>
			</div>
			<div className="card-body">
				<div className="card-preview-text">
					<div className="skeleton"></div>
					<div className="skeleton"></div>
					<div className="skeleton"></div>
					<div className="skeleton"></div>
				</div>
			</div>
			<div className="card-footer">
				<div className="skeleton skeleton-btn"></div>
			</div>
		</div>
	);
}
