function App() {
	return (
		<>
			<button data-custom-open>Show Custom Modal</button>
			<br />
			<button data-dialog-open>Show Dialog Modal</button>

			<dialog>
				<p>
					This is a <strong>DIALOG</strong> modal
				</p>
				<button>Close</button>
			</dialog>

			<div className="modal-overlay">
				<div className="modal">
					<p>
						This is a <strong>CUSTOM</strong> modal
					</p>
					<button>Close</button>
				</div>
			</div>
		</>
	);
}

export default App;
