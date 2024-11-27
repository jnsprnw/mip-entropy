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
	class="w-full sm:p-2 md:p-4 grid items-center justify-items-center justify-center max-w-[920px] mx-auto"
>
	{#if gridState.currentState === id_order}
		<Observer />
	{/if}
	<Gauge />
	<div class="col-start-3 row-start-1 w-full h-full p-2">
		<Grid />
	</div>
	<Actions />
</main>

<style>
	#stage {
		grid-template-rows: 5fr 50px;
		grid-template-columns: 2fr 1fr 5fr 1fr 2fr;
	}
</style>
