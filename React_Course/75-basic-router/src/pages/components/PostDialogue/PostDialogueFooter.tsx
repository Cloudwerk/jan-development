import { Link } from "react-router-dom";

export function PostDialogueFooter() {
	return (
		<div className="form-row form-btn-row">
			<Link className="btn btn-outline" to="..">
				Cancel
			</Link>
			<button className="btn" type="submit">
				Save
			</button>
		</div>
	);
}
