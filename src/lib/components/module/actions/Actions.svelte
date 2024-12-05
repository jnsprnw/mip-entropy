<script lang="ts">
	import { getGridState } from '$grid/grid-state.svelte';
	import Sort from './Sort.svelte';
	import Observer from './Observer.svelte';
	import Guess from './Guess.svelte';
	import Counter from './Counter.svelte';
	import Side from './Side.svelte';
	const gridState = getGridState();
	import { ID as id_order } from '$grid/grid-order.svelte';
	import { ID as id_simple } from '$grid/grid-simple.svelte';
	import { ID as id_move } from '$grid/grid-move.svelte';
</script>

{#if gridState.currentState === id_order}
	<div
		class="grid w-full h-full col-start-1 row-start-2 col-span-3 md:col-start-1 md:col-span-5 md:grid-cols-subgrid max-md:grid-cols-3"
	>
		<Sort />
		<Observer />
	</div>
{:else if gridState.currentState === id_simple}
	<Guess />
	<Counter />
{:else if gridState.currentState === id_move}
	<Side />
	<Observer />
{/if}
