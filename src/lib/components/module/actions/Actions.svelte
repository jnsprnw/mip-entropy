<script lang="ts">
	import { getGridState } from '$lib/components/grid/grid-state.svelte';
	import Sort from './Sort.svelte';
	import Observer from './Observer.svelte';
	import Guess from './Guess.svelte';
	const gridState = getGridState();
	import { ID as id_order } from '$lib/components/grid/grid-order.svelte';
	import { ID as id_simple } from '$lib/components/grid/grid-simple.svelte';
</script>

{#if gridState.currentState === id_order}
	<Sort />
	<Observer />
{:else if gridState.currentState === id_simple}
	<Guess />
{/if}
