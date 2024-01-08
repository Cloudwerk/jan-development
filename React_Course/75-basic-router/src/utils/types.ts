export interface IPostObject {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export interface IUseFetchPostReturn {
	data: Array<IPostObject> | undefined;
	isError: boolean;
	isLoading: boolean;
}

export interface IPostCardOptions {
	title: string;
	body: string;
	id: number;
}
