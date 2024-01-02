import { useCallback, useMemo, useState } from "react";

export function useArray(initialArray: Array<number>) {
	const [_array, setArray] = useState(initialArray);

	function set(array: Array<number>) {
		setArray(array);
	}
	function push(number: number) {}
	function replace(toReplace: number, replacement: number) {}
	function filter(callback: CallableFunction) {}
	function remove(index: number) {}
	function clear() {}
	function reset() {}
	return { array: [], set, push, replace, filter, remove, clear, reset };
}
