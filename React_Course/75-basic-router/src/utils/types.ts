import { Params } from "react-router-dom";

export interface IPostObject {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export interface IUseFetchPostsReturn {
	data: Array<IPostObject> | undefined;
	isError: boolean;
	isLoading: boolean;
}

export interface IUseFetchPostReturn {
	data: IPostObject | undefined;
	isError: boolean;
	isLoading: boolean;
}

export interface IPostCardOptions {
	title: string;
	body: string;
	id: number;
}

export interface IUserObject {
	id: number;
	name: string;
	username: string;
	email: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
		geo: {
			lat: number;
			lng: number;
		};
	};
	phone: string;
	website: string;
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
}

export interface IUserFetchReturn {
	data: IUserObject | undefined;
	isLoading: boolean;
	isError: boolean;
}

export interface IUseFetchUsersReturn {
	data: Array<IUserObject> | undefined;
	isLoading: boolean;
	isError: boolean;
}

export interface IUserCardsProps {
	name: string;
	website: string;
	email: string;
	id: number;
	company: {
		name: string;
		catchPhrase?: string;
		bs?: string;
	};
}

export interface ITodoObject {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

export interface IUseFetchTodosReturn {
	data: Array<ITodoObject> | undefined;
	isLoading: boolean;
	isError: boolean;
}

export interface ICommentObject {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
}

export interface ICommentsFetchReturn {
	data: Array<ICommentObject> | undefined;
	isLoading: boolean;
	isError: boolean;
}

export interface ILoaderFunctionsProps {
	request: {
		signal: AbortSignal;
	};
	params: Params<string>;
}

export interface SinglePostLoaderReturn {
	commentData: Array<ICommentObject>;
	userData: IUserObject;
	data: IPostObject;
}
