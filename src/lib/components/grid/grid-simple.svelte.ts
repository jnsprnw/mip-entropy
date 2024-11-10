// import { setContext, getContext } from 'svelte';
import {
	randomPlacement,
	createFilledFields,
	createGuessFields,
	getX,
	getY,
	fromCoords
} from '$lib/utils/utils';
import { range } from 'd3-array';
import { MODE_GUESS, MODE_LOOP } from '$config';

export const ID = Symbol('simple');

export function createSimple(size: number = 6) {
	let fields = $state(createFilledFields(size));
	let guesses = $state(createGuessFields(size, true));
	let center = $state<undefined | number>(undefined);
	let count_total = $state<number>(0);
	let count_run = $state<number>(0);
	let interval: undefined | typeof setInterval = undefined;
	let mode = $state<typeof MODE_LOOP | typeof MODE_GUESS>(MODE_LOOP);
	let canGuess = $state<boolean>(false);
	let count_guess = $state<number>(0);
	let count_found = $state<number>(0);

	const count_filled = $derived(fields.filter((f) => f).length);
	const count_fields = $derived(fields.length);

	function clearFields() {
		fields = createFilledFields(size);
	}

	function findHigh() {
		center = undefined;
		const placements = randomPlacement(size * size, 9);
		fields = fields.map((_, n) => (placements.includes(n) ? { fill: true } : undefined));
	}

	function loop(total: number, func: Function, time: number = 500, continuously: boolean = false) {
		mode = MODE_LOOP;
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
		loop(27540584512, findHigh, 200, true);
	}

	function findNextLow(start?: number | undefined) {
		if (typeof start !== 'undefined') {
			center = start;
		}
		if (typeof center === 'undefined') {
			center = 0;
		}

		do {
			center += 1;
			if (center >= size * size) {
				center = 0;
			}
		} while (!aroundPoint(center));
	}

	function loopLow() {
		center = 0;
		loop(16, findNextLow, 500, true);
	}

	function checkValidAroundPoint(position: number = 8) {
		const x = getX(position, size);
		const y = getY(position, size);
		if (x <= 0 || x >= size - 1 || y <= 0 || y >= size - 1) {
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

	function startGuess(func: Function, start?: number | undefined) {
		clearInterval(interval);
		clearFields();
		setTimeout(() => {
			canGuess = false;
			mode = MODE_GUESS;
			guesses = createGuessFields(size, false);
			count_guess = 0;
			count_found = 0;
			setTimeout(() => {
				func(start);
				canGuess = true;
			}, 500);
		}, 200);
	}

	const validPositions = range(0, size * size).filter((_, i) => checkValidAroundPoint(i));
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

	return {
		// get id() {
		// 	return ID;
		// },
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
		get count_filled() {
			return count_filled;
		},
		get count_fields() {
			return count_fields;
		},
		size,
		loopHigh,
		loopLow,
		guessLow,
		guessHigh,
		guess
	};
}
