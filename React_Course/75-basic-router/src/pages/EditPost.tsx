import { useLoaderData } from "react-router-dom";

export function EditPost() {
	const loaderData = useLoaderData();

	console.log(loaderData);

	return (
		<>
			<h1 className="page-title">Edit Post</h1>
			<form method="post" action="/posts/2/edit" className="form">
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="title">Title</label>
						<input type="text" name="title" id="title" value="qui est esse" />
					</div>
					<div className="form-group">
						<label htmlFor="userId">Author</label>
						<select name="userId" id="userId">
							<option value="1">Leanne Graham</option>
							<option value="2">Ervin Howell</option>
							<option value="3" selected>
								Clementine Bauch
							</option>
							<option value="4">Patricia Lebsack</option>
							<option value="5">Chelsey Dietrich</option>
							<option value="6">Mrs. Dennis Schulist</option>
							<option value="7">Kurtis Weissnat</option>
							<option value="8">Nicholas Runolfsdottir V</option>
							<option value="9">Glenna Reichert</option>
							<option value="10">Clementina DuBuque</option>
						</select>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="body">Body</label>
						<textarea name="body" id="body">
							est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis
							voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla
						</textarea>
					</div>
				</div>
				<div className="form-row form-btn-row">
					<a className="btn btn-outline" href="/posts/2">
						Cancel
					</a>
					<button className="btn">Save</button>
				</div>
			</form>
		</>
	);
}
