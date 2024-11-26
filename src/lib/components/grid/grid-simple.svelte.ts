import {
	randomPlacement,
	createFilledFields,
	createGuessFields,
	getX,
	getY,
	fromCoords
} from '$lib/utils/utils';
import { range } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { MODE_GUESS, MODE_LOOP, ENTROPY_LOW, ENTROPY_HIGH, GRID_SIZE } from '$config';
import type { EntropyLevel } from '$types';
import { getEntropyValue } from './utils-simple';

export const ID = 'simple' as const;

export const GUESS_PARTICLE_COUNT = 9;

export function createSimple() {
	let fields = $state(createFilledFields(GRID_SIZE));
	let guesses = $state(createGuessFields(GRID_SIZE, true));
	let center = $state<undefined | number>(undefined);
	let count_total = $state<number>(0);
	let count_run = $state<number>(0);
	let interval: undefined | typeof setInterval = undefined;
	let mode = $state<typeof MODE_LOOP | typeof MODE_GUESS>(MODE_LOOP);
	let canGuess = $state<boolean>(false);
	let count_guess = $state<number>(0);
	let count_found = $state<number>(0);
	let show_count = $state<boolean>(true);

	const count_fields = $derived(fields.length);

	let entropy_level = $state<EntropyLevel>(ENTROPY_LOW);
	const entropy_value = $derived(getEntropyValue(entropy_level));

	function clearFields() {
		fields = createFilledFields(GRID_SIZE);
	}

	function findHigh(range_size: number = 6, setLevel: boolean = true) {
		if (setLevel) {
			entropy_level = ENTROPY_HIGH;
		}

		center = undefined;
		const placements = randomPlacement(range_size, GUESS_PARTICLE_COUNT);
		fields = fields.map((_, n) => (placements.includes(n) ? { fill: true } : undefined));
	}

	function loop(
		total: number,
		func: () => void,
		time: number = 500,
		continuously: boolean = false
	) {
		mode = MODE_LOOP;
		show_count = true;
		canGuess = false;
		clearInterval(interval);
		count_run = 1;
		count_total = total;
		func();
		interval = setInterval(function () {
			if (count_run < count_total) {
				func();
				count_run += 1;
			} else {
				clearInterval(interval);
				if (continuously) {
					loop(total, func, time, continuously);
				}
			}
		}, time);
	}

	function loopHigh() {
		entropy_level = ENTROPY_HIGH;
		loop(27540584512, findHigh, 200, true);
	}

	function findNextLow(start?: number | undefined) {
		entropy_level = ENTROPY_LOW;
		if (typeof start !== 'undefined') {
			center = start;
		}
		if (typeof center === 'undefined') {
			center = 0;
		}

		do {
			center += 1;
			if (center >= GRID_SIZE * GRID_SIZE) {
				center = 0;
			}
		} while (!aroundPoint(center));
	}

	function loopLow() {
		entropy_level = ENTROPY_LOW;
		center = 0;
		loop(16, findNextLow, 500, true);
	}

	const entropy_scale = $derived(scaleLinear().range([0, 100]).domain([3, GRID_SIZE]));

	function toggleLowHigh() {
		show_count = false;
		mode = MODE_LOOP;
		canGuess = false;
		findNextLow(22); // Bottom left corner
		clearInterval(interval);
		let range_size = 3;
		interval = setInterval(function () {
			if (range_size < GRID_SIZE) {
				range_size += 1;
				entropy_level = entropy_scale(range_size);
				findHigh(range_size, false);
			} else {
				range_size = 2;
			}
		}, 3000);
	}

	function checkValidAroundPoint(position: number = 8) {
		const x = getX(position);
		const y = getY(position);
		if (x <= 0 || x >= GRID_SIZE - 1 || y <= 0 || y >= GRID_SIZE - 1) {
			return false;
		}
		return { x, y };
	}

	function aroundPoint(position: number = 8) {
		const { x, y } = checkValidAroundPoint(position);
		if (!x || !y) {
			return false;
		}

		const around = [
			fromCoords(x - 1, y - 1),
			fromCoords(x, y - 1),
			fromCoords(x + 1, y - 1),
			fromCoords(x - 1, y),
			fromCoords(x, y),
			fromCoords(x + 1, y),
			fromCoords(x - 1, y + 1),
			fromCoords(x, y + 1),
			fromCoords(x + 1, y + 1)
		];
		fields = fields.map((_, n) => (around.includes(n) ? { fill: true } : undefined));
		return true;
	}

	function startGuess(func: () => void, start?: number | undefined) {
		clearInterval(interval);
		clearFields();
		setTimeout(() => {
			canGuess = false;
			mode = MODE_GUESS;
			guesses = createGuessFields(GRID_SIZE, false);
			count_guess = 0;
			count_found = 0;
			setTimeout(() => {
				func(start);
				canGuess = true;
			}, 500);
		}, 200);
	}

	const validPositions = range(0, GRID_SIZE * GRID_SIZE).filter((_, i) => checkValidAroundPoint(i));
	function guessLow() {
		startGuess(findNextLow, validPositions[Math.floor(Math.random() * validPositions.length)]);
	}

	function guessHigh() {
		startGuess(findHigh);
	}

	function guess(position: number) {
		count_guess += 1;
		if (fields[position]) {
			count_found += 1;
		}
		guesses[position] = true;
	}

	function setEntropyLow() {
		entropy_level = ENTROPY_LOW;
	}
	function setEntropyHigh() {
		entropy_level = ENTROPY_HIGH;
	}

	return {
		get fields() {
			return fields;
		},
		get guesses() {
			return guesses;
		},
		get count_run() {
			return count_run;
		},
		get count_total() {
			return count_total;
		},
		get mode() {
			return mode;
		},
		get canGuess() {
			return canGuess;
		},
		get count_guess() {
			return count_guess;
		},
		get count_found() {
			return count_found;
		},
		get count_fields() {
			return count_fields;
		},
		get show_count() {
			return show_count;
		},
		get entropy_value() {
			return entropy_value;
		},
		get entropy_level() {
			return entropy_level;
		},
		loopHigh,
		loopLow,
		guessLow,
		guessHigh,
		guess,
		toggleLowHigh,
		setEntropyLow,
		setEntropyHigh
	};
}
