import "@testing-library/jest-dom/vitest";
import { afterEach, beforeAll, afterAll, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import { mockServer } from "./mockServer";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend({ matchers });

beforeAll(() => {
	mockServer.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
	cleanup();
	mockServer.resetHandlers();
});

afterAll(() => {
	mockServer.close();
});

Object.defineProperty(window, "scrollTo", { value: () => {} });
