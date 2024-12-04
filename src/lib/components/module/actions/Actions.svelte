<script lang="ts">
	import { getGridState } from '$grid/grid-state.svelte';
	import Sort from './Sort.svelte';
	import Observer from './Observer.svelte';
	import Guess from './Guess.svelte';
	import Side from './Side.svelte';
	const gridState = getGridState();
	import { ID as id_order } from '$grid/grid-order.svelte';
	import { ID as id_simple } from '$grid/grid-simple.svelte';
	import { ID as id_move } from '$grid/grid-move.svelte';
</script>

{#if gridState.currentState === id_order}
	<Sort />
	<Observer />
{:else if gridState.currentState === id_simple}
	<Guess />
{:else if gridState.currentState === id_move}
	<Side />
{/if}
