import { useLocalStorage } from "./useLocalStorage";

function App() {
	const { value: firstName, setValue: setFirstName } = useLocalStorage("FIRST_NAME", "");
	// Bonus:
	const { value: lastName, setValue: setLastName } = useLocalStorage("LAST_NAME", () => {
		return "Default";
	});

	// // Bonus:
	// const { value: hobbies, setValue: setHobbies } = useLocalStorage("HOBBIES", ["Programming", "Weight Lifting"]);

	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					marginBottom: "1rem",
				}}
			>
				<label>First Name</label>
				<input type="text" value={firstName as string} onChange={(e) => setFirstName(e.target.value)} />
			</div>

			{/* Bonus: */}
			{
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						marginBottom: "1rem",
					}}
				>
					<label>Last Name</label>
					<input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
				</div>
			}

			{/* Bonus:
			{
				<>
					<div>{hobbies.join(", ")}</div>
					<button onClick={() => setHobbies((currentHobbies) => [...currentHobbies, "New Hobby"])}>
						Add Hobby
					</button>{" "}
				</>
			} */}
		</>
	);
}

export default App;
