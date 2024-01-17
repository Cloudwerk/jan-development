import { Form, useActionData, useLoaderData } from "react-router-dom";
import { IEditPostFetchObject, IPostObject, IUserObject } from "../utils/types";
import { PostDialogueFooter } from "./components/PostDialogue/PostDialogueFooter";
import { PostDialogueBody } from "./components/PostDialogue/PostDialogueBody";
import { createContext } from "react";
import { PostDialogueTitle } from "./components/PostDialogue/PostDialogueTitle";

interface IEditPostContextProps {
	postData?: IPostObject;
	usersData: Array<IUserObject>;
}

export const EditPostContext = createContext<IEditPostContextProps>({
	postData: { userId: 0, id: 0, title: "", body: "" },
	usersData: new Array<IUserObject>(),
});

export function EditPost() {
	const { postData, usersData } = useLoaderData() as IEditPostFetchObject;
	const errorMessage = useActionData() as string;

	return (
		<>
			<h1 className="page-title">Edit Post</h1>
			<Form className="form" method="put">
				<EditPostContext.Provider value={{ postData, usersData }}>
					<PostDialogueTitle defaultValue={postData.title} errorMessage={errorMessage} />
				</EditPostContext.Provider>
				<PostDialogueBody defaultValue={postData.body} />
				<PostDialogueFooter />
			</Form>
		</>
	);
}
