interface IPostCardOptions {
	title: string;
	body: string;
	id: number;
}

export function PostCard({ title, body, id }: IPostCardOptions) {
	return (
		<div className="card">
			<div className="card-header">{title}</div>
			<div className="card-body">
				<div className="card-preview-text">{body.slice(0, 100)}</div>
			</div>
			<div className="card-footer">
				<a className="btn" href="post.html">
					View
				</a>
			</div>
		</div>
	);
}
