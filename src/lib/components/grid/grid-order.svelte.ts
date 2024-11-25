import { createMixedFields } from '$lib/utils/utils';
import { orderBy } from 'lodash-es';
import type { Observer, RichField } from '$types';
import { KEY_SORT_COLOR, KEY_SORT_FIGURE, OBSERVER_ALICE, OBSERVER_BOB } from '$config';

export const ID = 'order' as const;

export function createOrder(size: number = 6) {
	let fields = $state<RichField[]>(createMixedFields(size));
	let interval = $state<undefined | typeof setInterval>(undefined);

	let observer = $state<Observer>(undefined);
	const sort_by = $derived<typeof KEY_SORT_FIGURE | typeof KEY_SORT_COLOR>(
		observer === OBSERVER_ALICE ? KEY_SORT_COLOR : KEY_SORT_FIGURE
	);

	let allow_observer_switch = $state<boolean>(false);

	const is_sorting = $derived(typeof interval !== 'undefined');

	const count_filled = $derived(fields.filter((f) => f).length);
	const count_fields = $derived(fields.length);

	function getField(position: number): RichField | undefined {
		return fields.find(({ index }) => index === position);
	}

	const entropy = $derived.by(() => {
		let count = 0;
		for (let i = 0; i < fields.length - 1; i++) {
			if (typeof observer === 'undefined') {
				if (
					getField(i)?.color !== getField(i + 1)?.color ||
					getField(i)?.figure !== getField(i + 1)?.figure
				) {
					count++;
				}
			} else {
				if (getField(i)?.[sort_by] !== getField(i + 1)?.[sort_by]) {
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
		setObserver(OBSERVER_ALICE);
	}

	function setBob() {
		setObserver(OBSERVER_BOB);
	}

	function removeObserver() {
		setObserver(undefined);
	}

	function setObserver(value: Observer) {
		stopLoop();
		observer = value;
	}

	function allowObserverSwitch() {
		allow_observer_switch = true;
	}

	function disallowObserverSwitch() {
		allow_observer_switch = false;
	}

	function sort(time: number = 500) {
		interval = setInterval(function () {
			console.log('Sort items', is_sorted);
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
		get allow_observer_switch() {
			return allow_observer_switch;
		},
		max_entropy,
		size,
		shuffle,
		setObserver,
		sort,
		stopLoop,
		setAlice,
		setBob,
		removeObserver,
		allowObserverSwitch,
		disallowObserverSwitch
	};
}
