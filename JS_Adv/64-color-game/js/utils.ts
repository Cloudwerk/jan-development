export function clamp(min: number, max: number, x: number) {
	return Math.min(Math.max(x, min), max);
}

export function getRandomIntInRange(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export function shuffleArray(array: Array<any>) {
	let currentIndex = array.length,
		randomIndex: number;

	// While there remain elements to shuffle.
	while (currentIndex > 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}
