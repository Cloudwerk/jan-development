import { useEffect, useRef } from "react";
import { IModalProps } from "./CustomModal";

export function DialogModal({ isOpen, setIsOpen }: IModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		isOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
	}, [isOpen]);
	return (
		<dialog ref={dialogRef}>
			<p>
				This is a <strong>DIALOG</strong> modal
			</p>
			<button onClick={() => setIsOpen(false)}>Close</button>
		</dialog>
	);
}
