import { useEffect, useState } from "react";

export function useLocalStorage(key: string, initialValue: string) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		const _value = localStorage.getItem(key);
		_value ? setValue(_value) : console.log("nothing found in local storage!");
	}, []);

	useEffect(() => {
		localStorage.setItem(key, value);
	}, [value]);

	return { value, setValue };
}
