<script lang="ts">
	import Grid from '$lib/components/grid/Grid.svelte';
	import Observer from './Observer.svelte';
	import Gauge from './Gauge.svelte';
	import Actions from './actions/Actions.svelte';
	import { getGridState } from '$lib/components/grid/grid-state.svelte';
	const gridState = getGridState();
	import { ID as id_order } from '$lib/components/grid/grid-order.svelte';
</script>

<main
	id="stage"
	class="w-full aspect-video sm:p-2 grid-cols-[1fr_5fr_1fr] md:grid-cols-[2fr_1fr_5fr_1fr_2fr] md:p-4 grid items-center justify-items-center justify-center max-w-[920px] mx-auto"
>
	{#if gridState.currentState === id_order}
		<Observer />
	{/if}
	<Gauge />
	<div class="col-start-2 md:col-start-3 row-start-1 w-full h-full p-2">
		<Grid />
	</div>
	<Actions />
</main>

<style>
	#stage {
		grid-template-rows: 1fr 50px;
	}
</style>
