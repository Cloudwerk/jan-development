import { Link } from "react-router-dom";
import { IPostCardOptions } from "../../utils/types";

export function PostCard({ title, body, id }: IPostCardOptions) {
	return (
		<div className="card">
			<div className="card-header">{title}</div>
			<div className="card-body">
				<div className="card-preview-text">{body.slice(0, 100)}</div>
			</div>
			<div className="card-footer">
				<Link className="btn" to={id.toString()}>
					View
				</Link>
			</div>
		</div>
	);
}
