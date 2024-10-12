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
	const sort_by = $derived<'color' | 'figure'>(observer === 'alice' ? 'color' : 'figure');

	const count_filled = $derived(fields.filter((f) => f).length);
	const count_fields = $derived(fields.length);

	const is_sorted = $derived.by(() => {
		const sorted = fields.slice().sort((a, b) => {
			if (sort_by === 'color') {
				return a.color.localeCompare(b.color);
			} else {
				return a.figure.localeCompare(b.figure);
			}
		});
		return sorted.every((f, i) => f === fields[i]);
	});

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

	function sort(time: number = 500) {
		interval = setInterval(function () {
			if (!is_sorted) {
				for (let i = 0; i < fields.length; i++) {
					console.log(`Starting with ${i}: ${fields[i][sort_by]}`);
					const value_current = fields[i][sort_by];
					const value_next = fields[i + 1] ? fields[i + 1][sort_by] : undefined;
					if (value_current === value_next) {
						console.log(`Next element is ${i + 1}: ${fields[i + 1][sort_by]}`);
						continue;
					}
					const next_match = fields.findIndex(
						({ [sort_by]: value }, index) => index > i + 1 && value === value_current
					);
					if (next_match !== -1) {
						console.log(`Next match is ${next_match}: ${fields[next_match][sort_by]}`);
						const temp = fields[i + 1];
						fields[i + 1] = fields[next_match];
						fields[next_match] = temp;
					} else {
						continue;
					}
					break;
					//
				}
			} else {
				clearInterval(interval);
			}
		}, time);
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
		get sort_by() {
			return sort_by;
		},
		get is_sorted() {
			return is_sorted;
		},
		size,
		loopHigh,
		loopLow,
		shuffle,
		setObserver,
		sort
	};
}
