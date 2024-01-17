import { Form, Link, useLoaderData } from "react-router-dom";
import { IEditPostFetchObject } from "../utils/types";

export function EditPost() {
	const { postData, usersData } = useLoaderData() as IEditPostFetchObject;
	const errorMessage = useActionData() as string;

	return (
		<>
			<h1 className="page-title">Edit Post</h1>
			<Form className="form" method="put">
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="title">Title</label>
						<input type="text" name="title" id="title" defaultValue={postData.title} />
					</div>
					<div className="form-group">
						<label htmlFor="userId">Author</label>
						<select name="userId" id="userId" defaultValue={postData.userId}>
							{usersData.map((user) => {
								return (
									<option value={user.id} key={crypto.randomUUID()}>
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
						<textarea name="body" id="body" defaultValue={postData.body} />
					</div>
				</div>
				<div className="form-row form-btn-row">
					<Link className="btn btn-outline" to={".."}>
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
