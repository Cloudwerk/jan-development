import { describe, it, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { routes } from "../routes";
import { HttpResponse } from "msw";
import { addMockAPIRouteHandler } from "../../test-setup/mockServer";
import userEvent from "@testing-library/user-event";

describe("#PostList", () => {
	beforeAll(() => {
		addMockAPIRouteHandler("get", "/posts", ({ request }) => {
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
			return HttpResponse.json(
				posts.filter((post) => {
					const searchParams = new URL(request.url).searchParams;
					const param = searchParams.get("q") || "";
					const userId = parseInt(searchParams.get("userId"));
					return post.title.includes(param) && (isNaN(userId) || post.userId == userId);
				})
			);
		});
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
	it("should render", async () => {
		render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: [{ pathname: "/posts" }] })} />);

		expect(await screen.findByText("first post")).toBeInTheDocument();
	});
	it("properly apply search filters", async () => {
		const user = userEvent.setup();
		render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: [{ pathname: "/posts" }] })} />);

		const queryInput = await screen.findByLabelText("Query");
		const filterBtn = screen.getByText("Filter");
		await user.type(queryInput, "second");
		await user.click(filterBtn);

		expect(await screen.findByText("second post")).toBeInTheDocument();
		expect(screen.queryByText("first post")).not.toBeInTheDocument();
		expect(queryInput).toHaveValue("second");
	});
	it("properly apply user filters", async () => {
		const user = userEvent.setup();
		render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: [{ pathname: "/posts" }] })} />);

		const authorInput = await screen.findByLabelText("Author");
		const filterBtn = screen.getByText("Filter");
		await user.selectOptions(authorInput, "user one");
		await user.click(filterBtn);
		screen.debug();
		expect(screen.queryByText("second post")).not.toBeInTheDocument();
		expect(screen.getByText("first post")).toBeInTheDocument();
	});
});
