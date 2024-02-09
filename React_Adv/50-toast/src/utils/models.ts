export type toastPositions = "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";
export type Toast = {
	id: number;
	position: toastPositions;
	message: string;
	autoDismiss: boolean;
	autoDismissTimeout?: number;
};

export type ToastContextProps = {
	toasts: Array<Toast>;
	dispatchToasts: React.Dispatch<reducerProps>;
};
export type reducerActions = "ADD" | "DEL";
export type reducerProps = {
	action: reducerActions;
	payload: Toast;
};

export type takesChildren = {
	children: React.ReactNode;
};
