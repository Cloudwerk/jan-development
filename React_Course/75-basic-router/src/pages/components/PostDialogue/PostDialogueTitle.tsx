import { useContext } from "react";
import { UserSelector } from "./UserSelector";
import { EditPostContext } from "../../EditPost";

interface IPostDialogueTitleProps {
	defaultValue?: string;
	errorMessage?: string;
}

export function PostDialogueTitle({ defaultValue, errorMessage }: IPostDialogueTitleProps) {
	const { postData, usersData } = useContext(EditPostContext);

	return (
		<div className="form-row">
			<div className={`form-group ${errorMessage ? "error" : ""}`}>
				<label htmlFor="title">Title</label>
				<input type="text" name="title" id="title" defaultValue={defaultValue} />
				<div className="error-message">{errorMessage}</div>
			</div>
			<UserSelector users={usersData} defaultValue={postData ? postData.userId : 1} />
		</div>
	);
}
