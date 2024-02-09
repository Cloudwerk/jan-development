import { useToastDispatchContext } from "./ToastContextProvider";
import { toastPositions } from "./utils/models";

type ToastProps = {
	message: string;
	id: number;
	position: toastPositions;
	autoDismiss: boolean;
};

export function Toast({ message, id, position, autoDismiss }: ToastProps) {
	const dispatchToasts = useToastDispatchContext();

	function deleteSelf() {
		dispatchToasts({ action: "DEL", payload: { message, id, position, autoDismiss } });
	}
	return (
		<>
			{
				<div className="toast" onClick={() => deleteSelf()}>
					{message}
				</div>
			}
		</>
	);
}
