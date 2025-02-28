import { createMixedFields, isAlice } from '$lib/utils/utils';
import { orderBy } from 'lodash-es';
import type { Observer, RichField, SortByKey } from '$types';
import { KEY_SORT_COLOR, KEY_SORT_FIGURE, OBSERVER_ALICE, OBSERVER_BOB } from '$config';
import { sortBy, getFieldByPosition } from './utils-order';

export const ID = 'order' as const;

export function createOrder() {
	let fields = $state<RichField[]>(createMixedFields());
	let interval = $state<undefined | typeof setInterval>(undefined);

	let is_visible_bob = $state<boolean>(false);
	let is_visible_alice = $state<boolean>(false);

	let observer = $state<Observer>(undefined);
	const sort_by = $derived<SortByKey>(isAlice(observer) ? KEY_SORT_COLOR : KEY_SORT_FIGURE);
	const hasObserver = $derived(typeof observer !== 'undefined');

	let allow_observer_switch = $state<boolean>(false);

	const is_sorting = $derived(typeof interval !== 'undefined');

	const entropy = $derived<number>(sortBy(fields, observer, sort_by));

	const entropy_value = $derived([
		sortBy(fields, null, KEY_SORT_COLOR),
		sortBy(fields, null, KEY_SORT_FIGURE)
	]);

	const is_sorted = $derived(entropy === 0);

	const can_sort = $derived(typeof observer !== 'undefined' && !is_sorted);

	function stopLoop() {
		clearInterval(interval);
		interval = undefined;
	}

	function shuffle() {
		stopLoop();
		fields = createMixedFields();
	}

	function setAlice() {
		stopLoop();
		is_visible_alice = true;
		setObserver(OBSERVER_ALICE);
	}

	function setBob() {
		stopLoop();
		is_visible_bob = true;
		setObserver(OBSERVER_BOB);
	}

	function setVisibleAlice() {
		is_visible_alice = true;
	}

	function setInvisibleAlice() {
		is_visible_alice = false;
	}

	function setVisibleBob() {
		is_visible_bob = true;
	}

	function setInvisibleBob() {
		is_visible_bob = false;
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

	function sort() {
		interval = setInterval(function () {
			if (!is_sorted) {
				for (let i = 0; i < fields.length; i++) {
					const current_field = getFieldByPosition(fields, i);
					const next_field = getFieldByPosition(fields, i + 1);
					if (typeof current_field === 'undefined') {
						continue;
					}
					const value_current = current_field[sort_by];
					const value_next = next_field ? next_field[sort_by] : undefined;
					if (value_current === value_next || typeof next_field === 'undefined') {
						continue;
					}

					const next_match = orderBy(fields, 'index').find(
						({ [sort_by]: value, index }) => index > i + 1 && value === value_current
					);
					if (typeof next_match !== 'undefined') {
						const new_index = next_match.index;
						next_match.index = next_field.index;
						next_field.index = new_index;
					} else {
						continue;
					}
					break;
				}
			} else {
				stopLoop();
			}
		}, 500);
	}

	return {
		get fields() {
			return fields;
		},
		get observer() {
			return observer;
		},
		get hasObserver() {
			return hasObserver;
		},
		get is_visible_bob() {
			return is_visible_bob;
		},
		get is_visible_alice() {
			return is_visible_alice;
		},
		get entropy_value() {
			return entropy_value;
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
		shuffle,
		setObserver,
		sort,
		stopLoop,
		setAlice,
		setBob,
		removeObserver,
		allowObserverSwitch,
		disallowObserverSwitch,
		setVisibleAlice,
		setInvisibleAlice,
		setVisibleBob,
		setInvisibleBob
	};
}
