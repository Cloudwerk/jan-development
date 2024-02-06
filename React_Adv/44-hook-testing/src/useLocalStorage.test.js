import { describe, it, expect, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe(useLocalStorage, () => {
	it("stores the inital value", () => {
		const { result } = renderHook(({ key, value }) => useLocalStorage(key, value), {
			initialProps: { key: "SIMPLE_KEY", value: "foo" },
		});

		expect(result.current[0]).toBe("foo");
		expect(JSON.parse(localStorage.getItem("SIMPLE_KEY"))).toBe("foo");
	});
	it("stores the initial function value", () => {
		const { result } = renderHook(({ key, value }) => useLocalStorage(key, value), {
			initialProps: {
				key: "FUNCTION_KEY",
				value: () => {
					return "default";
				},
			},
		});

		expect(result.current[0]).toBe("default");
		expect(JSON.parse(localStorage.getItem("FUNCTION_KEY"))).toBe("default");
	});
});
