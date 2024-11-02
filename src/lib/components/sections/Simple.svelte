<script lang="ts">
	import Grid from '$lib/components/grid/Grid.svelte';
	// import { getSimpleState } from '$lib/components/grid/grid-simple.svelte';
	// import { MODE_GUESS, MODE_LOOP } from '$config';

	// const grid = getSimpleState();
</script>

<div class="flex gap-x-6">
	<Grid />
	<!--
	<aside class="flex flex-col m-6 gap-y-6">
		<section>
			<span class="font-semibold text-xl" class:text-amber-500={grid.mode === MODE_LOOP}>Loop</span>
			<div class="flex gap-x-6">
				<button
					onclick={() => grid.loopLow()}
					class="bg-slate-300 text-blue-900 border border-blue-900 rounded-md p-2">Loop Low</button
				>
				<button
					onclick={() => grid.loopHigh()}
					class="bg-slate-300 text-blue-900 border border-blue-900 rounded-md p-2">Loop High</button
				>
			</div>

			<span class:text-gray-200={grid.mode !== MODE_LOOP}
				>{grid.count_run} / {grid.count_total}</span
			>
		</section>
		<section>
			<span class="font-semibold text-xl" class:text-amber-500={grid.mode === MODE_GUESS}
				>Guess</span
			>
			<div class="flex gap-x-6">
				<button
					onclick={() => grid.guessLow()}
					class="bg-slate-300 text-blue-900 border border-blue-900 rounded-md p-2">Guess Low</button
				>
				<button
					onclick={() => grid.guessHigh()}
					class="bg-slate-300 text-blue-900 border border-blue-900 rounded-md p-2"
					>Guess High</button
				>
			</div>
			<span class:text-gray-200={grid.mode !== MODE_GUESS}
				>Guesses: {grid.count_guess} / {grid.count_fields} Found: {grid.count_found} / {grid.count_filled}</span
			>
		</section>
	</aside> -->
</div>
