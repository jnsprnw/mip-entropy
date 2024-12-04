<script lang="ts">
	import { getGridState } from '$grid/grid-state.svelte';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	import { MODE_GUESS, GRID_SIZE } from '$config';
	import { range } from 'd3-array';
	import { fade } from 'svelte/transition';
</script>

{#if grid.mode === MODE_GUESS}
	<div
		in:fade={{ duration: 500 }}
		class="grid justify-items-stretch content-stretch gap-[1px] border-2 border-grid-outer rounded-[5px] -m-px overflow-hidden"
		style="grid-template-columns: repeat({GRID_SIZE}, 1fr); grid-template-rows: repeat({GRID_SIZE}, 1fr); height: calc(100% + 2px);"
	>
		{#each range(GRID_SIZE * GRID_SIZE) as position}
			<button
				class="bg-accent-light outline outline-1 outline-grid-inner transition-[colors_opacity] focus:outline-none focus:bg-accent-dark hover:bg-accent-dark"
				disabled={!grid.canGuess || grid.guesses[position]}
				class:bg-transparent={grid.guesses[position]}
				class:pointer-events-none={grid.guesses[position]}
				onclick={() => grid.guess(position)}
				aria-label="Click to guess position {position}"
			></button>
		{/each}
	</div>
{/if}
