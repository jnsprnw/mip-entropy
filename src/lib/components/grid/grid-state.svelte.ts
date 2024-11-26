import { PADDING_GRID, GRID_SIZE } from '$config';
import { setContext, getContext } from 'svelte';
import { createOrder, ID as id_order } from './grid-order.svelte';
import { createSimple, ID as id_simple } from './grid-simple.svelte';
import { createMove, ID as id_move } from './grid-move.svelte';
import type { GridType } from '$types';

const GRID_KEY = Symbol('grid');

export function createGrid() {
	let currentState = $state<GridType>(id_simple);
	let grid_height = $state<number>(0);

	const gridState = $derived.by(() => {
		switch (currentState) {
			case id_simple:
				return createSimple();
			case id_order:
				return createOrder();
			case id_move:
				return createMove();
			default:
				console.warn(`Unknown state: ${currentState}`);
				return createSimple();
		}
	});

	const grid_width = $derived(
		grid_height + PADDING_GRID.left + PADDING_GRID.right - PADDING_GRID.top - PADDING_GRID.bottom
	);

	const entity_size = $derived((grid_width / GRID_SIZE) * 0.3);

	return {
		set height(value: number) {
			grid_height = value;
		},
		get height(): number {
			return grid_height;
		},
		get width(): number {
			return grid_width;
		},
		get grid() {
			return gridState;
		},
		get entity_size(): number {
			return entity_size;
		},
		set currentState(value: GridType) {
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
