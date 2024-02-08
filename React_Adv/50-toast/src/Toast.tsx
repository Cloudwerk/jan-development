import { toastPositions } from "./utils/models";

type ToastProps = {
	position: toastPositions;
	messages: Array<string>;
};

export function Toast({ position, messages }: ToastProps) {
	return (
		<div className={`toast-container ${position}`}>
			{messages.map((message, index) => {
				return (
					<div className="toast" data-id={index}>
						{message}
					</div>
				);
			})}
		</div>
	);
}
