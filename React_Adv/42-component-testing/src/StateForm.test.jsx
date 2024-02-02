import { describe, it, vi, expect, beforeEach } from "vitest";
import { StateForm } from "./StateForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("StateForm", () => {
	beforeEach(() => {
		userEvent.setup();
	});
	it("Shouldn't show error messages for a valid input", async () => {
		const func = vi.fn();
		render(<StateForm onSubmit={func} />);

		const emailInput = screen.getByLabelText("Email");
		const passwordInput = screen.getByLabelText("Password");
		await userEvent.type(emailInput, "test@webdevsimplified.com");
		await userEvent.type(passwordInput, "Password123456");

		const submitBtn = screen.getByText("Submit");
		await userEvent.click(submitBtn);
		expect(func).toHaveBeenCalledOnce();
		expect(func).toHaveBeenCalledWith({ email: "test@webdevsimplified.com", password: "Password123456" });
	});
	it("should show error messages for invalid input", async () => {
		const func = vi.fn();
		render(<StateForm onSubmit={func} />);

		const submitBtn = screen.getByText("Submit");
		await userEvent.click(submitBtn);

		expect(screen.getByText("Required, Must end with @webdevsimplified.com")).toBeInTheDocument();

		expect(
			screen.getByText(
				"Must be at least 10 characters, Must include at least 1 lowercase letter, Must include at least 1 uppercase letter, Must include at least 1 number"
			)
		).toBeInTheDocument();

		expect(func).not.toHaveBeenCalled();
	});
	it("should show different error messages after user input", async () => {
		const func = vi.fn();
		render(<StateForm onSubmit={func} />);

		const submitBtn = screen.getByText("Submit");
		await userEvent.click(submitBtn);
		const emailInput = screen.getByLabelText("Email");
		const passwordInput = screen.getByLabelText("Password");
		await userEvent.type(emailInput, "test@webdevsimplified.co");
		await userEvent.type(passwordInput, "assword123456");
		await userEvent.click(submitBtn);

		expect(screen.getByText("Must end with @webdevsimplified.com")).toBeInTheDocument();

		expect(screen.getByText("Must include at least 1 uppercase letter")).toBeInTheDocument();

		expect(func).not.toHaveBeenCalled();
	});
});
