import { useEffect } from "react";
import { useToastDispatchContext } from "./ToastContextProvider";
import { Toast } from "./utils/models";

export function Toast({ message, id, position, autoDismiss, autoDismissTimeout }: Toast) {
	const dispatchToasts = useToastDispatchContext();

	useEffect(() => {
		if (autoDismiss) setTimeout(() => deleteSelf(), autoDismissTimeout);
	}, []);

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
