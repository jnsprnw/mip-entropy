<script lang="ts">
	import Grid from '$grid/Grid.svelte';
	import Observer from './Observer.svelte';
	import Gauges from './Gauges.svelte';
	import Actions from './actions/Actions.svelte';
	import { getGridState } from '$grid/grid-state.svelte';
	const gridState = getGridState();
	import { ID as id_order } from '$grid/grid-order.svelte';
	import { ID as id_simple } from '$grid/grid-simple.svelte';
	import { ID as id_move } from '$grid/grid-move.svelte';

	const cols = $derived.by(() => {
		switch (gridState.currentState) {
			case id_order:
				return `grid-cols-[60px_1fr_60px] [grid-template-areas:'gaugeA_grid_gaugeB''left_center_right'] md:grid-cols-[70px_75px_1fr_75px_70px] md:[grid-template-areas:'alice_gaugeA_grid_gaugeB_bob''left_left_center_right_right'] lg:grid-cols-[120px_75px_1fr_75px_120px]`;
			case id_move:
				return `grid-cols-[60px_1fr_60px] [grid-template-areas:'grid_grid_grid''left_center_right'] md:grid-cols-[75px_1fr_75px] lg:grid-cols-[90px_1fr_90px]`;
			case id_simple:
				return `grid-cols-[60px_1fr_60px] [grid-template-areas:'gaugeA_grid_gaugeB''left_center_right'] md:grid-cols-[75px_1fr_75px] lg:grid-cols-[90px_1fr_90px]`;
		}
	});
</script>

<main
	class="{cols} px-2 lg:px-0 w-full aspect-square sm:aspect-[1.4] md:aspect-video sm:p-2 gap-x-4 grid-rows-[auto_50px] md:p-4 grid items-center justify-items-center justify-center max-w-[920px] mx-auto"
>
	{#if gridState.currentState === id_order}
		<Observer />
	{/if}
	<Gauges />
	<div class="col-start-[grid] col-end-[grid] aspect-square row-start-1 h-full max-w-full p-2">
		<Grid />
	</div>
	<Actions />
</main>
