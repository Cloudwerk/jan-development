interface IOptionsObject {
	method: string;
	body: string;
	headers: {
		"Content-type": string;
	};
}

export function useFetch(url: string) {
	return { data: "", isLoading: "", isError: "" };
}
