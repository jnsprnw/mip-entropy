import {
	ENTITY_COLOR_A,
	ENTITY_COLOR_B,
	ENTITY_SHAPE_SQUARE,
	ENTITY_SHAPE_TRIANGLE,
	GRID_SIZE,
	KEY_SORT_COLOR,
	KEY_SORT_FIGURE,
	OBSERVER_ALICE,
	OBSERVER_BOB
} from '$config';
import type { Observer, EntityColor, RichField, SimpleField } from '$types';

export function shuffleArray<T>(array: T[]): T[] {
	for (let i = array.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function getLowerLeftIndices(location_size: number): number[] {
	const indices: number[] = [];

	if (location_size > 0 && location_size <= GRID_SIZE) {
		const startRow = GRID_SIZE - location_size;

		for (let row = startRow; row < GRID_SIZE; row++) {
			for (let col = 0; col < location_size; col++) {
				indices.push(row * GRID_SIZE + col);
			}
		}
	}

	return indices;
}

export function randomPlacement(location_size: number = 4, count: number = 9) {
	const positions = getLowerLeftIndices(location_size);

	for (let i = positions.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[positions[i], positions[j]] = [positions[j], positions[i]];
	}

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

export function createMixedFields(): RichField[] {
	const numberOfEachType = (GRID_SIZE * GRID_SIZE) / 4;
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

export function getX(position: number) {
	return position % GRID_SIZE;
}

export function getY(position: number) {
	return Math.floor(position / GRID_SIZE);
}

export function fromCoords(x: number, y: number) {
	return y * GRID_SIZE + x;
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

export function isAlice(observer: Observer) {
	return observer === OBSERVER_ALICE;
}
