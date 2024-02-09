import { Toast } from "./Toast";
import { useToastValueContext } from "./ToastContextProvider";
import { Toast as toastType, toastPositions } from "./utils/models";

export function ToastsContainer() {
	const toasts = useToastValueContext();

	const topRight = toasts.filter((toast) => toast.position === "top-right");
	const topLeft = toasts.filter((toast) => toast.position === "top-left");
	const topCenter = toasts.filter((toast) => toast.position === "top-center");
	const bottomRight = toasts.filter((toast) => toast.position === "bottom-right");
	const bottomLeft = toasts.filter((toast) => toast.position === "bottom-left");
	const bottomCenter = toasts.filter((toast) => toast.position === "bottom-center");

	return (
		<>
			<SingleToastContainer position="top-right" toasts={topRight} />
			<SingleToastContainer position="top-left" toasts={topLeft} />
			<SingleToastContainer position="top-center" toasts={topCenter} />
			<SingleToastContainer position="bottom-right" toasts={bottomRight} />
			<SingleToastContainer position="bottom-left" toasts={bottomLeft} />
			<SingleToastContainer position="bottom-center" toasts={bottomCenter} />
		</>
	);
}

type Props = {
	position: toastPositions;
	toasts: Array<toastType>;
};

function SingleToastContainer({ position, toasts }: Props) {
	return (
		<div className={`toast-container ${position}`}>
			{toasts.map((toast) => {
				return <Toast {...toast} />;
			})}
		</div>
	);
}
