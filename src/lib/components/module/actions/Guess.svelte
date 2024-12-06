<script lang="ts">
	import { getGridState } from '$grid/grid-state.svelte';
	import { GUESS_PARTICLE_COUNT } from '$grid/grid-simple.svelte';
	import Button from '$ui/Button.svelte';
	import { MODE_GUESS, ENTROPY_LOW } from '$config';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { mode, canGuess, count_guess, count_found, guessLow, entropy_level, guessHigh } =
		$derived(grid);
</script>

{#if mode === MODE_GUESS}
	<div
		class="col-start-[left] col-end-[right] row-start-2 gap-x-12 grid grid-cols-2 text-center items-center"
	>
		<div class="flex flex-col transition-opacity" class:opacity-50={!canGuess}>
			<div class="font-medium text-primary-dark">
				<em class="not-italic text-xl/none tabular-nums">{count_guess}</em>
				<span class="text-xs uppercase tracking-wider">
					{count_guess == 1 ? 'guess' : 'guesses'}
				</span>
			</div>
			<hr class="h-px my-1 bg-primary-dark border-0" />
			<span class="text-xs tabular-nums uppercase font-medium tracking-wider">
				{#if count_found < GUESS_PARTICLE_COUNT}
					{count_found} / {GUESS_PARTICLE_COUNT} particles found
				{:else}
					Good job!
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
