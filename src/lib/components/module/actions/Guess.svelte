<script lang="ts">
	import { getGridState } from '$lib/components/grid/grid-state.svelte';
	import { GUESS_PARTICLE_COUNT } from '$lib/components/grid/grid-simple.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { MODE_GUESS, ENTROPY_LOW } from '$config';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { mode, canGuess, count_guess, count_found, guessLow, entropy_level, guessHigh } =
		$derived(grid);
</script>

{#if mode === MODE_GUESS}
	<div class="col-start-1 col-span-5 row-start-2 grid grid-cols-2 text-center items-center gap-x-4">
		<div class="flex flex-col transition-opacity" class:opacity-50={!canGuess}>
			<span class="text-xs">Guesses: {count_guess}</span>
			<span class="text-xs">
				{#if count_found < GUESS_PARTICLE_COUNT}
					{count_found} / {GUESS_PARTICLE_COUNT} particles found
				{:else}
					Good job
				{/if}
			</span>
		</div>
		<Button
			label="Reset grid"
			disabled={!canGuess}
			onclick={() => (entropy_level === ENTROPY_LOW ? guessLow() : guessHigh())}
		/>
	</div>
{/if}
