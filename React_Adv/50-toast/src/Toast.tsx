type ToastProps = {
	message: string;
	id: number;
};

export function Toast({ message, id }: ToastProps) {
	return <>{<div className="toast">{message}</div>}</>;
}
