import { useEffect, useState } from "react";

interface IUseFetchOptions {
	method: string;
	body: string;
	headers: {
		"Content-type": string;
	};
}

export function useFetch(_url: string) {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		setData(undefined);
		setIsError(false);
		setIsLoading(true);

		const controller = new AbortController();
		fetch(_url, { signal: controller.signal })
			.then((res) => res.json())
			.then(setData)
			.catch((e) => {
				if (e.name === "AbortError") return;
				setIsError(true);
			})
			.finally(() => {
				if (controller.signal.aborted) return;
				setIsLoading(false);
			});

		return () => {
			controller.abort();
		};
	}, [_url]);
	return { data, isLoading, isError };
}
