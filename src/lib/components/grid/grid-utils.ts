import type { GridType } from '$types';

import { ID as id_order } from '$lib/components/grid/grid-order.svelte';
import { ID as id_simple } from '$lib/components/grid/grid-simple.svelte';
import { ID as id_move } from '$lib/components/grid/grid-move.svelte';

const grid_type_ids = [id_order, id_simple, id_move];

export function checkGridTypeIDs(id: GridType): boolean {
	return grid_type_ids.includes(id);
}
