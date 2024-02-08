type ToastProps = {
	position: "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";
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
