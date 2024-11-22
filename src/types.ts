import { ID as id_simple } from '$lib/components/grid/grid-simple.svelte';
import { ID as id_order } from '$lib/components/grid/grid-order.svelte';
import { ID as id_move } from '$lib/components/grid/grid-move.svelte';
import { OBSERVER_ALICE, OBSERVER_BOB } from '$config';}

export type GridType = typeof id_simple | typeof id_order | typeof id_move;

export type Page = {
	text: string;
	actions?: string[];
	type?: GridType;
};

export type Observer = typeof OBSERVER_ALICE | typeof OBSERVER_BOB | undefined;
