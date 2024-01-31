import { useEffect, useState } from "react";
import { IEventProps } from "../AddEventModal";
import { parseJSON } from "date-fns";

export function useLocalStorage(key: string, initialValue: string | (() => string) | Array<any>) {
	const [value, setValue] = useState(() => {
		const localValue = localStorage.getItem(key);
		if (localValue == null) {
			if (typeof initialValue === "function") {
				return initialValue();
			} else {
				return initialValue;
			}
		} else {
			return JSON.parse(localValue);
		}
	});

	useEffect(() => {
		if (value === undefined) localStorage.removeItem(key);
		else localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return { value, setValue };
}

interface IUnparsedEventProps {
	name: string;
	allDay: string;
	startTime: string | undefined;
	endTime: string | undefined;
	color: "blue" | "green" | "red";
}
export function useParseEvent(key: string, initialValue: Array<IEventProps>) {
	const { value, setValue } = useLocalStorage(key, initialValue);

	const parsedValue: Array<IEventProps> = value.map((event: IUnparsedEventProps) => {
		return {
			...event,
			startTime: event.startTime ? parseJSON(event.startTime) : undefined,
			endTime: event.endTime ? parseJSON(event.endTime) : undefined,
		};
	});
	return { value: parsedValue, setValue };
}
