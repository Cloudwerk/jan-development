import { useEffect, useState } from "react";

export function useLocalStorage(key: string, initialValue: string | (() => string)) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		const _value = localStorage.getItem(key);
		if (_value) setValue(_value);
	}, []);

	useEffect(() => {
		localStorage.setItem(key, value);
	}, [value]);

	return { value, setValue };
}
