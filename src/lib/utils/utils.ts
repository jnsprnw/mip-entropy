export function shuffleArray<T>(array: T[]): T[] {
	for (let i = array.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export function randomPlacement(n: number = 36, count: number = 9) {
	// return Array.from({ length: n }, () => Math.floor(Math.random() * n)).slice(0, count + 1);
	const positions = Array.from({ length: n }, (_, index) => index);

	// Zufällig mischen
	for (let i = positions.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[positions[i], positions[j]] = [positions[j], positions[i]];
	}

	// Die ersten 'count' Positionen zurückgeben
	return positions.slice(0, count);
}

type SimpleField = { fill: boolean | undefined } | undefined;

export function createFilledFields(
	size: number = 6,
	fill: boolean | undefined = undefined
): SimpleField[] {
	return [Array(size).fill(Array(size).fill({ fill }))].flat(3);
}

type GuessField = boolean | undefined;

export function createGuessFields(
	size: number = 6,
	fill: boolean | undefined = undefined
): GuessField[] {
	return [Array(size).fill(Array(size).fill(fill))].flat(3);
}

type RichField = { color: string; figure: string; index: number };

export function createMixedFields(size: number = 6): RichField[] {
	const numberOfEachType = (size * size) / 4;
	const fields: RichField[] = [];
	for (let i = 0; i < numberOfEachType; i++) {
		['red', 'blue'].forEach((color) => {
			['square', 'triangle'].forEach((figure) => {
				fields.push({ color, figure });
			});
		});
	}
	const shuffled = shuffleArray(fields);
	return shuffled.map((field, index) => ({ ...field, index }));
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

export function getFill(observer: 'alice' | 'bob' | undefined, color: 'blue' | 'red' | undefined) {
	if (observer === 'bob') {
		return 'fill-slate-300';
	}
	switch (color) {
		case 'blue':
			return 'fill-violet-300';
		case 'red':
			return 'fill-emerald-300';
		default:
			return undefined;
	}
}
