import { Form, useActionData, useLoaderData } from "react-router-dom";
import { IUserObject } from "../utils/types";
import { PostDialogueFooter } from "./components/PostDialogue/PostDialogueFooter";
import { PostDialogueBody } from "./components/PostDialogue/PostDialogueBody";
import { PostDialogueTitle } from "./components/PostDialogue/PostDialogueTitle";
import { EditPostContext } from "./EditPost";

export function NewPost() {
	const usersData = useLoaderData() as Array<IUserObject>;
	const errorMessage = useActionData() as string;

	return (
		<>
			<h1 className="page-title">New Post</h1>
			<Form method="post" className="form">
				<EditPostContext.Provider value={{ usersData }}>
					<PostDialogueTitle errorMessage={errorMessage} />
				</EditPostContext.Provider>
				<PostDialogueBody />
				<PostDialogueFooter />
			</Form>
		</>
	);
}
