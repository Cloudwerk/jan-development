import { useCallback, useMemo, useState } from "react";

export function useArray(initialArray: Array<number>) {
	const [_array, setArray] = useState(initialArray);

	const push = useCallback((number: number) => setArray([..._array, number]), [_array]);

	function set(array: Array<number>) {
		setArray(array);
	}
	function replace(toReplace: number, replacement: number) {}
	function filter(callback: CallableFunction) {}
	function remove(index: number) {}
	function clear() {}
	function reset() {}
	return { array: _array, set, push, replace, filter, remove, clear, reset };
}
