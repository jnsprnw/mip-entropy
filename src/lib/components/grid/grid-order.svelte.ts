// import { setContext, getContext } from 'svelte';
import { createMixedFields } from '$lib/utils/utils';
import { orderBy } from 'lodash-es';

export const ID = Symbol('order');

export function createOrder(size: number = 6) {
	let fields = $state(createMixedFields(size));
	let interval = $state<undefined | typeof setInterval>(undefined);

	let observer = $state<undefined | 'alice' | 'bob'>(undefined);
	const sort_by = $derived<'color' | 'figure'>(observer === 'alice' ? 'color' : 'figure');

	const is_sorting = $derived(typeof interval !== 'undefined');

	const count_filled = $derived(fields.filter((f) => f).length);
	const count_fields = $derived(fields.length);

	// const is_sorted = $derived.by(() => {
	// 	const sorted = fields.slice().sort((a, b) => {
	// 		if (sort_by === 'color') {
	// 			return a.color.localeCompare(b.color);
	// 		} else {
	// 			return a.figure.localeCompare(b.figure);
	// 		}
	// 	});
	// 	// TODO: Fix this. Sorting can be the other way around. This is alphabettical and the other depends on the starting point.
	// 	return sorted.every((f, i) => f[sort_by] === fields[i][sort_by]);
	// });

	const entropy = $derived.by(() => {
		let count = 0;
		for (let i = 0; i < fields.length - 1; i++) {
			if (typeof observer === 'undefined') {
				if (fields[i].color !== fields[i + 1].color || fields[i].figure !== fields[i + 1].figure) {
					count++;
				}
			} else {
				if (fields[i][sort_by] !== fields[i + 1][sort_by]) {
					count++;
				}
			}
		}
		return count - 1;
	});

	const max_entropy = size * size - 1;

	const is_sorted = $derived(entropy === 0);

	const can_sort = $derived(typeof observer !== 'undefined' && !is_sorted);

	function stopLoop() {
		clearInterval(interval);
		interval = undefined;
	}

	function shuffle() {
		stopLoop();
		fields = createMixedFields(size);
	}

	function setAlice() {
		setObserver('alice');
	}

	function setBob() {
		setObserver('bob');
	}

	function setObserver(value: 'alice' | 'bob' | undefined) {
		stopLoop();
		observer = value;
	}

	function getField(position: number) {
		return fields.find(({ index }) => index === position);
	}

	function sort(time: number = 500) {
		interval = setInterval(function () {
			if (!is_sorted) {
				for (let i = 0; i < fields.length; i++) {
					const current_field = getField(i);
					const next_field = getField(i + 1);
					if (typeof current_field === 'undefined') {
						continue;
					}
					// console.log(`Starting with ${i}: ${fields[i][sort_by]}`);
					const value_current = current_field[sort_by];
					const value_next = next_field ? next_field[sort_by] : undefined;
					if (value_current === value_next || typeof next_field === 'undefined') {
						// console.log(`Next element is ${i + 1}: ${fields[i + 1][sort_by]}`);
						continue;
					}

					const next_match = orderBy(fields, 'index').find(
						({ [sort_by]: value, index }) => index > i + 1 && value === value_current
					);
					if (typeof next_match !== 'undefined') {
						// console.log(`Next match is ${next_match}: ${fields[next_match][sort_by]}`);
						const new_index = next_match.index;
						next_match.index = next_field.index;
						next_field.index = new_index;
						// const temp = getField(i+1);
						// getField(i+1).index = getField(next_match);
						// getField(next_match) = temp;
					} else {
						continue;
					}
					break;
				}
			} else {
				stopLoop();
			}
		}, time);
	}

	return {
		// get id() {
		// 	return ID;
		// },
		get fields() {
			return fields;
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
		get is_sorting() {
			return is_sorting;
		},
		get can_sort() {
			return can_sort;
		},
		get entropy() {
			return entropy;
		},
		max_entropy,
		size,
		shuffle,
		setObserver,
		sort,
		stopLoop,
		setAlice,
		setBob
	};
}
