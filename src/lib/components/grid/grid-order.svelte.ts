import { randomPlacement, createMixedFields, getX, getY, fromCoords } from '$lib/utils/utils.ts';

export function createOrder(size: number = 6) {
	let fields = $state(createMixedFields(size));
	let center = $state<undefined | number>(undefined);
	let count_total = $state<number>(0);
	let count_run = $state<number>(0);
	let interval: undefined | typeof setInterval = undefined;
	let mode = $state<'loop' | 'guess'>('loop');
	let canGuess = $state<boolean>(false);

	let observer = $state<undefined | 'alice' | 'bob'>(undefined);

	const count_filled = $derived(fields.filter((f) => f).length);
	const count_fields = $derived(fields.length);

	function findHigh() {
		center = undefined;
		const placements = randomPlacement(size * size, size);
		fields = fields.map((_, n) => (placements.includes(n) ? true : undefined));
	}

	function loop(total: number, func: Function, time: number = 500) {
		mode = 'loop';
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
			}
		}, time);
	}

	function loopHigh() {
		loop(27540584512, findHigh, 200);
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
		loop(16, findNextLow);
	}

	function aroundPoint(position: number = 8) {
		const x = getX(position, size);
		const y = getY(position, size);
		if (x <= 0 || x >= size - 1 || y <= 0 || y >= size - 1) {
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
		fields = fields.map((_, n) => (around.includes(n) ? true : undefined));
		return true;
	}

	function shuffle() {
		fields = createMixedFields(size);
	}

	function setObserver(value: 'alice' | 'bob' | undefined) {
		observer = value;
	}

	return {
		get fields() {
			return fields;
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
		get observer() {
			return observer;
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
		shuffle,
		setObserver
	};
}
