import { useState } from "react";
import { CustomModal } from "./CustomModal";
import { DialogModal } from "./DialogModal";

function App() {
	const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
	const [isDialogModalOpen, setIsDialogModalOpen] = useState(false);

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			isCustomModalOpen && setIsCustomModalOpen(false);
			isDialogModalOpen && setIsDialogModalOpen(false);
		}
	});

	return (
		<>
			<button onClick={() => setIsCustomModalOpen(true)}>Show Custom Modal</button>
			<br />
			<button onClick={() => setIsDialogModalOpen(true)}>Show Dialog Modal</button>

			{isDialogModalOpen && <DialogModal isOpen={isDialogModalOpen} setIsOpen={setIsDialogModalOpen} />}

			{isCustomModalOpen && <CustomModal setIsOpen={setIsCustomModalOpen} />}
		</>
	);
}

export default App;
