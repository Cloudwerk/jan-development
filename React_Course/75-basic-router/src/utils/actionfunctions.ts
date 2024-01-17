import { ActionFunctionArgs, redirect } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function postNewPost({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const title = formData.get("title");
	const body = formData.get("body");
	const userId = parseInt(formData.get("userId")!.toString());

	if (title === "") return "Title is required!";
	if (userId == null) return "User is required!";

	await fetch(`${API_URL}/Posts`, {
		method: "POST",
		signal: request.signal,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ userId: userId, title: title, body: body }),
	}).then((res) => res.json());

	return redirect("/posts");
}
