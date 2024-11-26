import { scaleLinear } from 'd3-scale';
import type { Observer, RichField, SortByKey } from '$types';
import { GRID_SIZE, KEY_SORT_COLOR, KEY_SORT_FIGURE, OBSERVER_ALICE, OBSERVER_BOB } from '$config';

export function getFieldByPosition(fields: RichField[], position: number): RichField | undefined {
	return fields.find(({ index }) => index === position);
}

const entropx_max = GRID_SIZE * GRID_SIZE - 1;

const entropy_scale = scaleLinear().range([0, 100]).domain([0, entropx_max]);

export function sortBy(fields: RichField[], observer: Observer | null, sort_by_ley: SortByKey) {
	let count = 0;
	for (let i = 0; i < fields.length - 1; i++) {
		const field_i = getFieldByPosition(fields, i);
		const field_i1 = getFieldByPosition(fields, i + 1);

		if (typeof observer === 'undefined') {
			// No observer
			if (
				field_i?.[KEY_SORT_COLOR] !== field_i1?.[KEY_SORT_COLOR] ||
				field_i?.[KEY_SORT_FIGURE] !== field_i1?.[KEY_SORT_FIGURE]
			) {
				count++;
			}
		} else {
			// Alice or Bob as observer
			if (field_i?.[sort_by_ley] !== field_i1?.[sort_by_ley]) {
				count++;
			}
		}
	}
	return entropy_scale(count - 1);
}

const LABEL_ALICE = 'Alice';
const LABEL_BOB = 'Bob';

export function getObserverDetail(observer: typeof OBSERVER_ALICE | typeof OBSERVER_BOB) {
	if (observer === OBSERVER_ALICE) {
		return {
			label: LABEL_ALICE,
			other: {
				id: OBSERVER_BOB,
				label: LABEL_BOB
			}
		};
	} else {
		return {
			label: LABEL_BOB,
			other: {
				id: OBSERVER_ALICE,
				label: LABEL_ALICE
			}
		};
	}
}
