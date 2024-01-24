import { createPortal } from "react-dom";

interface ICustomModalProps {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CustomModal({ setIsOpen }: ICustomModalProps) {
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
