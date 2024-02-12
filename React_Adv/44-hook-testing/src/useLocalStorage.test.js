import { describe, it, expect, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe(useLocalStorage, () => {
	afterEach(() => {
		localStorage.clear();
	});

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
	it("updates local storage whenever setValue is called", () => {
		const { result } = renderHook(({ key, value }) => useLocalStorage(key, value), {
			initialProps: { key: "SIMPLE_KEY", value: "foo" },
		});

		act(() => result.current[1]("bar"));
		expect(JSON.parse(localStorage.getItem("SIMPLE_KEY"))).toBe("bar");
	});
	it("clears local storage, whenever setValue is called with undefined", () => {
		const { result } = renderHook(({ key, value }) => useLocalStorage(key, value), {
			initialProps: { key: "SIMPLE_KEY", value: "foo" },
		});

		act(() => result.current[1](undefined));
		expect(JSON.parse(localStorage.getItem("SIMPLE_KEY"))).not.toBe();
	});
	it("uses the value from localStorage if it exists instead of the initialValue passed", () => {
		localStorage.setItem("SIMPLE_KEY", JSON.stringify("bar"));
		const { result } = renderHook(({ key, value }) => useLocalStorage(key, value), {
			initialProps: { key: "SIMPLE_KEY", value: "foo" },
		});

		expect(result.current[0]).toBe("bar");
		expect(JSON.parse(localStorage.getItem("SIMPLE_KEY"))).toBe("bar");
	});
});
