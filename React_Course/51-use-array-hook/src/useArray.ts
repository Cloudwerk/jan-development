export function useArray(initialArray: Array<number>) {
	function set(array: Array<number>) {}
	function push(number: number) {}
	function replace(toReplace: number, replacement: number) {}
	function filter(callback: CallableFunction) {}
	function remove(index: number) {}
	function clear() {}
	function reset() {}
	return { array: [], set, push, replace, filter, remove, clear, reset };
}
