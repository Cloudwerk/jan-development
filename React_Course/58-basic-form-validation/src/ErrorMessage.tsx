interface IErrorMessageArguments {
	message: string;
}

export function ErrorMessage({ message }: IErrorMessageArguments) {
	return <div className={`msg`}>{message}</div>;
}
