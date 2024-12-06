import { PADDING_GRID, PADDING_GRID_WITH_WEIGHT, GRID_SIZE } from '$config';
import { setContext, getContext } from 'svelte';
import { createOrder, ID as id_order } from './grid-order.svelte';
import { createSimple, ID as id_simple } from './grid-simple.svelte';
import { createMove, ID as id_move } from './grid-move.svelte';
import type { GridType, Padding } from '$types';

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

	const padding: Padding = $derived.by(() => {
		switch (currentState) {
			case id_move:
				return PADDING_GRID_WITH_WEIGHT;
			default:
				return PADDING_GRID;
		}
	});

	const grid_height_inner: number = $derived.by(() => {
		return grid_height - padding.top + padding.bottom;
	});

	const grid_width: number = $derived.by(() => {
		const width = grid_height_inner + padding.left + padding.right;
		gridState.width = grid_height - padding.left * 2 + padding.right * 2;
		return width;
	});

	const entity_size = $derived((grid_height / GRID_SIZE) * 0.3);

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
