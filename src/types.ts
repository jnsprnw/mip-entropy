import { ID as id_simple } from '$lib/components/grid/grid-simple.svelte';
import { ID as id_order } from '$lib/components/grid/grid-order.svelte';
import { ID as id_move } from '$lib/components/grid/grid-move.svelte';
import {
	KEY_SORT_COLOR,
	KEY_SORT_FIGURE,
	OBSERVER_ALICE,
	OBSERVER_BOB,
	ENTITY_COLOR_A,
	ENTITY_COLOR_B
} from '$config';

export type GridType = typeof id_simple | typeof id_order | typeof id_move;

export type Page = {
	text: string;
	actions?: string[];
	type?: GridType;
};

export type Observer = typeof OBSERVER_ALICE | typeof OBSERVER_BOB | undefined;
export type EntityColor = typeof ENTITY_COLOR_A | typeof ENTITY_COLOR_B | undefined;

export type SimpleField = { fill: boolean | undefined } | undefined;

export type RichField = { index?: number; [KEY_SORT_COLOR]: string; [KEY_SORT_FIGURE]: string };
