import { parseLinkHeader } from "./parseLinkHeader";
import useAsync from "./useAsync";

export interface IUseFetchLinkHeaderValues<T> {
	data: Array<T>;
	linkHeaders: {
		fist: string;
		next: string;
		last: string;
	};
}

export interface IImageData {
	url: string;
}

const DEFAULT_OPTIONS = {
	headers: { "Content-Type": "application/json" },
};

export default function useFetch(url: string, options?: RequestInit, dependencies = []) {
	return useAsync(() => {
		return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((res) => {
			if (res.ok) return res.json();
			return res.json().then((json) => Promise.reject(json));
		});
	}, dependencies);
}

export function useFetchWithLinkHeader<T>(url: string, options?: RequestInit, dependencies = []) {
	return useAsync<T>(() => {
		return fetch(url, { ...DEFAULT_OPTIONS, ...options })
			.then(async (res) => {
				if (res.ok) {
					const linkHeaders = res.headers.get("Link");
					const data = await res.json();
					return { data, linkHeaders: linkHeaders ? parseLinkHeader(linkHeaders) : { next: "" } };
				}
				// if (res.ok) return res.json();
				return res.json().then((json) => Promise.reject(json));
			})
			.then((data) => data);
	}, dependencies);
}
