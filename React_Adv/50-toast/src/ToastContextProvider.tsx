import { createContext, useContext, useReducer } from "react";
import { Toast, reducerProps, takesChildren } from "./utils/models";

function reducer(toasts: Array<Toast>, { action, payload }: reducerProps) {
	switch (action) {
		case "ADD":
			return [...toasts, payload];
		case "DEL":
			return toasts.filter((toast) => toast.id != payload.id);
		default:
			return toasts;
	}
}

const ToastValueContext = createContext(new Array<Toast>());
const ToastDispatchContext = createContext<React.Dispatch<reducerProps>>(() => {});

function ToastContextProvider({ children }: takesChildren) {
	const [toasts, dispatchToasts] = useReducer(reducer, new Array<Toast>());

	return (
		<ToastDispatchContext.Provider value={dispatchToasts}>
			<ToastValueContext.Provider value={toasts}>{children}</ToastValueContext.Provider>
		</ToastDispatchContext.Provider>
	);
}

const useToastValueContext = () => useContext(ToastValueContext);
const useToastDispatchContext = () => useContext(ToastDispatchContext);

export { useToastValueContext, useToastDispatchContext, ToastContextProvider };
