import { useLoaderData } from "react-router-dom";
import { IUserObject } from "../utils/types";
import { useRef, useState } from "react";

export function NewPost() {
	const usersData = useLoaderData() as Array<IUserObject>;
	const titleRef = useRef<HTMLInputElement>(null);
	const bodyRef = useRef<HTMLTextAreaElement>(null);
	const authorRef = useRef<HTMLSelectElement>(null);
	const [errorClass, setErrorClass] = useState("");

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (titleRef.current?.value === "") setErrorClass("error");
		else setErrorClass("");
		// TODO POST
	}

	return (
		<>
			<h1 className="page-title">New Post</h1>
			<form method="post" action="/posts/new" className="form" onSubmit={onSubmit}>
				<div className="form-row">
					<div className={`form-group ${errorClass}`}>
						<label htmlFor="title">Title</label>
						<input ref={titleRef} type="text" name="title" id="title" />
						{errorClass === "" ? "" : <div className="error-message">Required</div>}
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
			</form>
		</>
	);
}
