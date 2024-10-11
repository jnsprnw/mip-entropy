export function shuffleArray(array) {
	for (let i = array.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export function randomPlacement(n: number = 36, size: number = 6) {
	// return Array.from({ length: n }, () => Math.floor(Math.random() * n)).slice(0, size + 1);
	const positions = Array.from({ length: n }, (_, index) => index);

	// Zufällig mischen
	for (let i = positions.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[positions[i], positions[j]] = [positions[j], positions[i]];
	}

	// Die ersten 'count' Positionen zurückgeben
	return positions.slice(0, size);
}

export function createFilledFields(size: number = 6, fill: boolean | undefined = undefined) {
	return [Array(size).fill(Array(size).fill(fill))].flat(3);
}

export function getX(position: number, size: number = 6) {
	return position % size;
}

export function getY(position: number, size: number = 6) {
	return Math.floor(position / size);
}

export function fromCoords(x: number, y: number, size: number = 6) {
	return y * size + x;
}
