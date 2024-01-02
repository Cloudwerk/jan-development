import { useCallback, useState } from "react";

export function useArray(initialArray: Array<number>) {
	const [_array, setArray] = useState(initialArray);

	const set = useCallback((array: Array<number>) => setArray(array), []);
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
	const remove = useCallback(
		(index: number) =>
			_array.length === index + 1
				? setArray([..._array.slice(0, index)])
				: setArray([..._array.slice(0, index), ..._array.slice(index + 1)]),
		[_array]
	);
	const clear = useCallback(() => setArray([]), []);
	const reset = useCallback(() => setArray(initialArray), [initialArray]);
	return { array: _array, set, push, replace, filter, remove, clear, reset };
}
