import { setContext, getContext } from 'svelte';
import { createOrder, ID as id_order } from './grid-order.svelte';
import { createSimple, ID as id_simple } from './grid-simple.svelte';
import { createMove, ID as id_move } from './grid-move.svelte';

const GRID_KEY = Symbol('grid');

export function createGrid() {
	let currentState = $state<string>(id_simple);

	const gridState = $derived.by(() => {
		switch (currentState) {
			case id_simple:
				return createSimple();
			case id_order:
				return createOrder();
			case id_move:
				return createMove();
			default:
				console.warn(`Unknown state: ${currentState.toString()}`);
				return createSimple();
		}
	});

	return {
		get grid() {
			return gridState;
		},
		set currentState(value: string) {
			currentState = value;
		},
		get currentState(): string {
			return currentState.toString();
		}
	};
}

export function setGridState() {
	return setContext(GRID_KEY, createGrid());
}

export function getGridState() {
	return getContext<ReturnType<typeof createGrid>>(GRID_KEY);
}
