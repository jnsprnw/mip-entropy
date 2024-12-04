import { PADDING_GRID, PADDING_GRID_WITH_WEIGHT, GRID_SIZE } from '$config';
import { setContext, getContext } from 'svelte';
import { createOrder, ID as id_order } from './grid-order.svelte';
import { createSimple, ID as id_simple } from './grid-simple.svelte';
import { createMove, ID as id_move } from './grid-move.svelte';
import type { GridType, Padding } from '$types';

const GRID_KEY = Symbol('grid');

export function createGrid() {
	let currentState = $state<GridType>(id_simple);
	let grid_width = $state<number>(0);

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

	const padding: Padding = $derived.by(() => {
		switch (currentState) {
			case id_move:
				return PADDING_GRID_WITH_WEIGHT;
			default:
				return PADDING_GRID;
		}
	});

	const grid_width_inner = $derived.by(() => {
		const width = grid_width - padding.left - padding.right;
		gridState.width = width;
		return width;
	});

	const grid_height = $derived(grid_width_inner + padding.top + padding.bottom);

	const entity_size = $derived((grid_height / GRID_SIZE) * 0.3);

	return {
		set width(value: number) {
			grid_width = value;
		},
		get width(): number {
			return grid_width;
		},
		get height(): number {
			return grid_height;
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
		},
		get padding(): Padding {
			return padding;
		}
	};
}

export function setGridState() {
	return setContext(GRID_KEY, createGrid());
}

export function getGridState() {
	return getContext<ReturnType<typeof createGrid>>(GRID_KEY);
}
