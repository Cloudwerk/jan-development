interface IPostBodyArgs {
	defaultValue?: string;
}

export function PostDialogueBody({ defaultValue }: IPostBodyArgs) {
	return (
		<div className="form-row">
			<div className="form-group">
				<label htmlFor="body">Body</label>
				<textarea name="body" id="body" defaultValue={defaultValue} />
			</div>
		</div>
	);
}
