import "./styles.css";
import { ToastContextProvider } from "./ToastContextProvider";
import { ToastForms } from "./ToastForms";
import { ToastsContainer } from "./ToastsContainer";

function App() {
	return (
		<ToastContextProvider>
			<ToastForms />
			<ToastsContainer />
		</ToastContextProvider>
	);
}

export default App;
