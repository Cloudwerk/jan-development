import { Form, useActionData, useLoaderData } from "react-router-dom";
import { IUserObject } from "../utils/types";
import { useRef } from "react";

export function NewPost() {
	const usersData = useLoaderData() as Array<IUserObject>;
	const titleRef = useRef<HTMLInputElement>(null);
	const bodyRef = useRef<HTMLTextAreaElement>(null);
	const authorRef = useRef<HTMLSelectElement>(null);
	const errorMessage = useActionData() as string;

	return (
		<>
			<h1 className="page-title">New Post</h1>
			<Form method="post" className="form">
				<div className="form-row">
					<div className={`form-group ${errorMessage ? "error" : ""}`}>
						<label htmlFor="title">Title</label>
						<input ref={titleRef} type="text" name="title" id="title" />
						<div className="error-message">{errorMessage}</div>
					</div>
					<div className="form-group">
						<label htmlFor="userId">Author</label>
						<select ref={authorRef} name="userId" id="userId">
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
						<textarea ref={bodyRef} name="body" id="body"></textarea>
					</div>
				</div>
				<div className="form-row form-btn-row">
					<a className="btn btn-outline" href="/posts">
						Cancel
					</a>
					<button className="btn" type="submit">
						Save
					</button>
				</div>
			</Form>
		</>
	);
}
