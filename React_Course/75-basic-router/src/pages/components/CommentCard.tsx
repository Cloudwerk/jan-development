import { ICommentObject } from "../../utils/types";

export function CommentCard({ email, body }: ICommentObject) {
	return (
		<div className="card">
			<div className="card-body">
				<div className="text-sm mb-1">{email}</div>
				{body}
			</div>
		</div>
	);
}
