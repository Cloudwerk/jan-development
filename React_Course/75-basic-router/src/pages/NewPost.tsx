import { Form, Link, useActionData, useLoaderData } from "react-router-dom";
import { IUserObject } from "../utils/types";

export function NewPost() {
	const usersData = useLoaderData() as Array<IUserObject>;
	const errorMessage = useActionData() as string;

	return (
		<>
			<h1 className="page-title">New Post</h1>
			<Form method="post" className="form">
				<div className="form-row">
					<div className={`form-group ${errorMessage ? "error" : ""}`}>
						<label htmlFor="title">Title</label>
						<input type="text" name="title" id="title" />
						<div className="error-message">{errorMessage}</div>
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
					<Link className="btn btn-outline" to="..">
						Cancel
					</Link>
					<button className="btn" type="submit">
						Save
					</button>
				</div>
			</Form>
		</>
	);
}
