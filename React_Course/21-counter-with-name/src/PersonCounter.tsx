import { useState } from "react";

export function PersonCounter() {
	const [name, setName] = useState("Kyle");
	const [age, setAge] = useState(27);

	function addAge() {
		setAge((currentAge) => currentAge + 1);
	}

	function subAge() {
		setAge((currentAge) => currentAge - 1);
	}

	return (
		<div>
			<div>
				My Name is {name} and I am {age} years old
			</div>
			<br />
			<button onClick={addAge}>+</button>
			<button onClick={subAge}>-</button>
			<br />
			<input
				type="text"
				value={name}
				onChange={(e) => {
					setName(e.target.value);
				}}
			></input>
		</div>
	);
}
