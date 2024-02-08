import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { routes } from "../routes";
import { HttpResponse } from "msw";
import { addMockAPIRouteHandler } from "../../test-setup/mockServer";
import userEvent from "@testing-library/user-event";

describe("#NewPost", () => {
	const posts = [
		{
			id: 1,
			title: "first post",
			body: "first post body",
			userId: 1,
		},
		{
			id: 2,
			title: "second post",
			body: "second post body",
			userId: 2,
		},
	];
	beforeEach(() => {
		addMockAPIRouteHandler("get", "/users", () => {
			return HttpResponse.json([
				{
					id: 1,
					name: "user one",
				},
				{
					id: 2,
					name: "user two",
				},
			]);
		});
	});
	it("successfully creates a new post", async () => {
		const user = userEvent.setup();

		const newPostAPIHandler = vi.fn(async ({ request }) => {
			const reqBodyJSON = await request.json();
			const title = reqBodyJSON.title;
			const body = reqBodyJSON.body;
			const userId = reqBodyJSON.userId;
			const id = 1;

			addMockAPIRouteHandler("get", `/posts/${id}`, () => {
				return HttpResponse.json({ id, title, body, userId });
			});
			addMockAPIRouteHandler("get", `/users/${userId}`, () => {
				return HttpResponse.json({ id: 2, name: "user two" });
			});
			addMockAPIRouteHandler("get", `/posts/${id}/comments`, () => {
				return HttpResponse.json([]);
			});

			return HttpResponse.json({ id, title, body, userId });
		});
		addMockAPIRouteHandler("post", "/posts", newPostAPIHandler);

		render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: [{ pathname: "/posts/new" }] })} />);

		const titleInput = await screen.findByLabelText("Title");
		const authorInput = screen.getByLabelText("Author");
		const bodyInput = screen.getByLabelText("Body");
		const submitBtn = screen.getByText("Save");

		const title = "My Title";
		const author = "user two";
		const body = "Post Body Text";

		await user.type(titleInput, title);
		await user.selectOptions(authorInput, author);
		await user.type(bodyInput, body);
		await user.click(submitBtn);

		expect(newPostAPIHandler).toHaveBeenCalledOnce();
		expect(await screen.findByText(title)).toBeInTheDocument();
	});
});
