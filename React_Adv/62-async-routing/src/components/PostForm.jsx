import { Await, Form, Link } from "react-router-dom";
import { FormGroup } from "./FormGroup";
import { Suspense } from "react";

export function PostForm({
	users,
	isSubmitting,
	errors = {},
	defaultValues = new Promise((resolve) => {
		setTimeout(() => {
			resolve({});
		}, 1000);
	}),
}) {
	return (
		<Form method="post" className="form">
			<div className="form-row">
				<FormGroup errorMessage={errors.title}>
					<label htmlFor="title">Title</label>
					<Suspense
						fallback={
							<input disabled type="text" name="title" className="skeleton skeleton-input" value="Loading..."></input>
						}
					>
						<Await resolve={defaultValues}>
							{(defaultValues) => <input type="text" name="title" id="title" defaultValue={defaultValues.title} />}
						</Await>
					</Suspense>
				</FormGroup>
				<FormGroup errorMessage={errors.userId}>
					<label htmlFor="userId">Author</label>
					<Suspense
						fallback={
							<select disabled className="skeleton skeleton-input">
								<option>Loading...</option>
							</select>
						}
					>
						<Await resolve={defaultValues}>
							{(defaultValues) => (
								<select name="userId" id="userId" defaultValue={defaultValues.userId}>
									<Await resolve={users}>
										{(users) =>
											users.map((user) => (
												<option key={user.id} value={user.id}>
													{user.name}
												</option>
											))
										}
									</Await>
								</select>
							)}
						</Await>
					</Suspense>
				</FormGroup>
			</div>
			<div className="form-row">
				<FormGroup errorMessage={errors.body}>
					<label htmlFor="body">Body</label>
					<Suspense fallback={<textarea disabled className="skeleton skeleton-input" value="Loading..."></textarea>}>
						<Await resolve={defaultValues}>
							{(defaultValues) => <textarea name="body" id="body" defaultValue={defaultValues.body}></textarea>}
						</Await>
					</Suspense>
				</FormGroup>
			</div>
			<div className="form-row form-btn-row">
				<Suspense
					fallback={
						<>
							<div className="skeleton skeleton-btn"></div>
							<div className="skeleton skeleton-btn"></div>
						</>
					}
				>
					<Await resolve={users}>
						<Link className="btn btn-outline" to="..">
							Cancel
						</Link>
						<button disabled={isSubmitting} className="btn">
							{isSubmitting ? "Saving" : "Save"}
						</button>
					</Await>
				</Suspense>
			</div>
		</Form>
	);
}

export function postFormValidator({ title, body, userId }) {
	const errors = {};

	if (title === "") {
		errors.title = "Required";
	}

	if (body === "") {
		errors.body = "Required";
	}

	if (userId === "") {
		errors.userId = "Required";
	}

	return errors;
}
