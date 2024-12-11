<script lang="ts">
	import Grid from '$grid/Grid.svelte';
	import Observer from './Observer.svelte';
	import Gauges from './Gauges.svelte';
	import Actions from './actions/Actions.svelte';
	import Move from './Move.svelte';

	import { getGridState } from '$grid/grid-state.svelte';
	const gridState = getGridState();
	import { ID as id_order } from '$grid/grid-order.svelte';
	import { ID as id_simple } from '$grid/grid-simple.svelte';
	import { ID as id_move } from '$grid/grid-move.svelte';

	const cols_stage = $derived.by(() => {
		switch (gridState.currentState) {
			case id_order:
				return `grid-cols-[60px_1fr_60px] [grid-template-areas:'gaugeA_grid_gaugeB''left_center_right'] md:grid-cols-[70px_75px_1fr_75px_70px] md:[grid-template-areas:'alice_gaugeA_grid_gaugeB_bob''left_left_center_right_right'] lg:grid-cols-[120px_75px_1fr_75px_120px]`;
			case id_move:
				return `grid-cols-[1fr_4fr_1fr] [grid-template-areas:'moveA_grid_moveB''left_center_right'] sm:grid-cols-[1fr_2fr_1fr] lg:grid-cols-[1fr_2fr_1fr]`;
			case id_simple:
				return `grid-cols-[60px_1fr_60px] [grid-template-areas:'gaugeA_grid_gaugeB''left_center_right'] md:grid-cols-[75px_1fr_75px] lg:grid-cols-[90px_1fr_90px]`;
		}
	});

	const aspect_grid = $derived.by(() => {
		switch (gridState.currentState) {
			case id_move:
				return 'aspect-[1.3]';
			default:
				return 'aspect-square';
		}
	});
</script>

<main
	class="{cols_stage} px-2 lg:px-0 place-self-center w-full aspect-[1.5] mobile:aspect-[2.2] sm:p-2 gap-x-1 sm:gap-x-4 grid-rows-[auto_50px] md:p-4 grid items-center justify-items-center justify-center max-w-[920px] mx-auto"
>
	{#if gridState.currentState === id_order}
		<Observer />
	{/if}
	{#if gridState.currentState === id_move}
		<Move />
	{/if}
	<Gauges />
	<div class="col-start-[grid] col-end-[grid] {aspect_grid} row-start-1 h-full max-w-full p-2">
		<Grid />
	</div>
	<Actions />
</main>
