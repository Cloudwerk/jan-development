import { useLoaderData } from "react-router-dom";
import { IUserObject } from "../utils/types";

export function NewPost() {
	const usersData = useLoaderData() as Array<IUserObject>;

	return (
		<div className="container">
			<h1 className="page-title">New Post</h1>
			<form method="post" action="/posts/new" className="form">
				<div className="form-row">
					<div className="form-group error">
						<label htmlFor="title">Title</label>
						<input type="text" name="title" id="title" />
						<div className="error-message">Required</div>
					</div>
					<div className="form-group">
						<label htmlFor="userId">Author</label>
						<select name="userId" id="userId">
							{usersData.map((user, index) => {
								return (
									<option value={index + 1} key={crypto.randomUUID()}>
										{user.name}
									</option>
								);
							})}
						</select>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="body">Body</label>
						<textarea name="body" id="body"></textarea>
					</div>
				</div>
				<div className="form-row form-btn-row">
					<a className="btn btn-outline" href="/posts">
						Cancel
					</a>
					<button className="btn">Save</button>
				</div>
			</form>
		</div>
	);
}
