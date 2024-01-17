import { Form, Link, useActionData, useLoaderData } from "react-router-dom";
import { IUserObject } from "../utils/types";
import { UserSelector } from "./components/UserSelector";

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
					<UserSelector users={usersData} defaultValue={1} />
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
