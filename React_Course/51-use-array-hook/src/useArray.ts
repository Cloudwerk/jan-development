import { useCallback, useState } from "react";

export function useArray(initialArray: Array<number>) {
	const [_array, setArray] = useState(initialArray);

	const push = useCallback((number: number) => setArray([..._array, number]), [_array]);
	const replace = useCallback(
		(indexToReplace: number, replacement: number) =>
			setArray([..._array.slice(0, indexToReplace), replacement, ..._array.slice(indexToReplace + 1)]),
		[_array]
	);
	const filter = useCallback(
		(callback: (value: number, index?: number, array?: number[]) => boolean) => setArray(_array.filter(callback)),
		[_array]
	);

	function set(array: Array<number>) {
		setArray(array);
	}
	// function replace(toReplace: number, replacement: number) {}
	// function filter(callback: CallableFunction) {}
	function remove(index: number) {}
	function clear() {}
	function reset() {}
	return { array: _array, set, push, replace, filter, remove, clear, reset };
}
