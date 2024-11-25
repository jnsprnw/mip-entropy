import type { Observer, RichField, SortByKey } from '$types';
import { KEY_SORT_COLOR, KEY_SORT_FIGURE, OBSERVER_ALICE, OBSERVER_BOB } from '$config';

export function getFieldByPosition(fields: RichField[], position: number): RichField | undefined {
	return fields.find(({ index }) => index === position);
}

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
	return count - 1;
}

export function getObserverDetail(observer: typeof OBSERVER_ALICE | typeof OBSERVER_BOB) {
	if (observer === OBSERVER_ALICE) {
		return {
			label: 'Alice',
			other: OBSERVER_BOB
		};
	} else {
		return {
			label: 'Bob',
			other: OBSERVER_ALICE
		};
	}
}
