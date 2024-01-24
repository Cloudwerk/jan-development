import { createPortal } from "react-dom";

export interface IModalProps {
	isOpen?: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CustomModal({ setIsOpen }: IModalProps) {
	return createPortal(
		<div className="modal-overlay show">
			<div className="modal">
				<p>
					This is a <strong>CUSTOM</strong> modal
				</p>
				<button type="button" onClick={() => setIsOpen(false)}>
					Close
				</button>
			</div>
		</div>,
		document.body
	);
}
