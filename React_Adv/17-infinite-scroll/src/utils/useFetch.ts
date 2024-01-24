import { parseLinkHeader } from "./parseLinkHeader";
import useAsync from "./useAsync";

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

export function useFetchWithLinkHeader(url: string, options?: RequestInit, dependencies = []) {
	return useAsync(() => {
		return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((res) => {
			if (res.ok) {
				const linkHeaders = res.headers.get("Link");
				return { data: res.json(), linkHeaders: linkHeaders ? parseLinkHeader(linkHeaders) : { next: "" } };
			}
			// if (res.ok) return res.json();
			return res.json().then((json) => Promise.reject(json));
		});
	}, dependencies);
}
