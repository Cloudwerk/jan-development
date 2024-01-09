import { redirect } from "react-router-dom";
import { ICommentObject, ILoaderFunctionsProps, IPostObject, IUserObject } from "./types";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export function FetchPostData({ request: { signal } }: ILoaderFunctionsProps) {
	return fetch(`${API_URL}/Posts`, { signal }).then((res) => {
		if (res.status === 200) return res.json();

		throw redirect("/404");
	});
}

export function FetchUsersData({ request: { signal } }: ILoaderFunctionsProps) {
	return fetch(`${API_URL}/Users`, { signal }).then((res) => {
		if (res.status === 200) return res.json();

		throw redirect("/404");
	});
}

export function FetchTodosData({ request: { signal } }: ILoaderFunctionsProps) {
	return fetch(`${API_URL}/Todos`, { signal }).then((res) => {
		if (res.status === 200) return res.json();

		throw redirect("/404");
	});
}

export function FetchSinglePostData({ params, request: { signal } }: ILoaderFunctionsProps) {
	return fetch(`${API_URL}/posts/${params.PostId!.toString()}`, { signal })
		.then((res) => {
			if (res.status === 200) return res.json();

			throw redirect("/404");
		})
		.then((data: IPostObject) => {
			return fetch(`${API_URL}/posts/${params.PostId!.toString()}/comments`, { signal })
				.then((_res) => {
					if (_res.status === 200) return _res.json();

					throw redirect("/404");
				})
				.then((commentData: Array<ICommentObject>) => {
					return fetch(`${API_URL}/users/${data.userId}`, { signal })
						.then((res) => {
							if (res.status === 200) return res.json();

							throw redirect("/404");
						})
						.then((userData: IUserObject) => {
							return { userData, commentData, data };
						});
				});
		});
}
