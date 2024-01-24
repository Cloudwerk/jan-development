import { useState } from "react";
import { CustomModal } from "./CustomModal";

function App() {
	const [isCustomModelOpen, setIsCustomModalOpen] = useState(false);

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			isCustomModelOpen && setIsCustomModalOpen(false);
		}
	});

	return (
		<>
			<button onClick={() => setIsCustomModalOpen(true)}>Show Custom Modal</button>
			<br />
			<button data-dialog-open>Show Dialog Modal</button>

			<dialog>
				<p>
					This is a <strong>DIALOG</strong> modal
				</p>
				<button>Close</button>
			</dialog>

			{isCustomModelOpen && <CustomModal setIsOpen={setIsCustomModalOpen} />}
		</>
	);
}

export default App;
