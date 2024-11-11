<script lang="ts">
	import { MODE_GUESS, MODE_LOOP } from '$config';
	import { getGridState } from '$lib/components/grid/grid-state.svelte';

	const state = getGridState();
	const { grid } = $derived(state);
</script>

{#if grid.mode === MODE_GUESS}
	<span>Guesses: {grid.count_guess}</span><br />
	<span>{grid.count_found} / {grid.count_filled} particles found</span>
{:else if grid.mode === MODE_LOOP}
	<span>{grid.count_run} / {grid.count_total} configurations</span>
{/if}
