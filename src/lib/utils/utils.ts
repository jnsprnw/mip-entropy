import {
	OBSERVER_BOB,
	ENTITY_COLOR_A,
	ENTITY_COLOR_B,
	ENTITY_SHAPE_TRIANGLE,
	ENTITY_SHAPE_SQUARE,
	KEY_SORT_COLOR,
	KEY_SORT_FIGURE
} from '$config';
import type { Observer, EntityColor, RichField, SimpleField } from '$types';

export function shuffleArray<T>(array: T[]): T[] {
	for (let i = array.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function getLowerLeftIndices(location_size: number, size: number = 6): number[] {
	const fieldSize = size; // Das 9x9-Feld
	const indices: number[] = [];

	if (location_size > 0 && location_size <= fieldSize) {
		// Startzeile für das n*n-Feld im unteren linken Bereich
		const startRow = fieldSize - location_size;

		for (let row = startRow; row < fieldSize; row++) {
			for (let col = 0; col < location_size; col++) {
				indices.push(row * fieldSize + col);
			}
		}
	}

	return indices;
}

export function randomPlacement(
	location_size: number = 4,
	size_grid: number = 6,
	count: number = 9
) {
	const positions = getLowerLeftIndices(location_size, size_grid);
	// Array.from({ length: n }, (_, index) => index);

	// Zufällig mischen
	for (let i = positions.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[positions[i], positions[j]] = [positions[j], positions[i]];
	}

	// Die ersten 'count' Positionen zurückgeben
	return positions.slice(0, count);
}

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

export function createMixedFields(size: number = 6): RichField[] {
	const numberOfEachType = (size * size) / 4;
	const fields: RichField[] = [];
	for (let i = 0; i < numberOfEachType; i++) {
		[ENTITY_COLOR_A, ENTITY_COLOR_B].forEach((color) => {
			[ENTITY_SHAPE_SQUARE, ENTITY_SHAPE_TRIANGLE].forEach((figure) => {
				fields.push({ [KEY_SORT_COLOR]: color, [KEY_SORT_FIGURE]: figure });
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

export function getFill(observer: Observer, color: EntityColor) {
	if (observer === OBSERVER_BOB) {
		return 'fill-entity-mute';
	}
	switch (color) {
		case ENTITY_COLOR_A:
			return 'fill-entity-a';
		case ENTITY_COLOR_B:
			return 'fill-entity-b';
		default:
			console.warn(`Undefined color ${color}`);
			return 'fill-slate-600';
	}
}
