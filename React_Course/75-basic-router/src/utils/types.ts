import { Params } from "react-router-dom";

export interface IPostObject {
	userId: number;
	id: number;
	title: string;
	body: string;
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

export interface ICommentObject {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
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

export interface SingleUserLoaderReturn {
	userData: IUserObject;
	postsData: Array<IPostObject>;
	todosData: Array<ITodoObject>;
}

export interface IEditPostFetchObject {
	postData: IPostObject;
	usersData: Array<IUserObject>;
}
