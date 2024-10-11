<script lang="ts">
	import Grid from '$lib/components/grid/Grid.svelte';
	import { createSimple } from '$lib/components/grid/grid.svelte.ts';
	import { setContext } from 'svelte';

	const grid = createSimple(6);
	setContext('Grid', grid);
</script>

<div class="flex gap-x-6">
	<Grid />

	<aside class="flex flex-col m-6 gap-y-6">
		<section>
			<span class="font-semibold text-xl" class:text-red-500={grid.mode === 'loop'}>Loop</span>
			<div class="flex gap-x-6">
				<button onclick={() => grid.loopLow()} class="bg-black text-white rounded-md p-2"
					>Loop Low</button
				>
				<button onclick={() => grid.loopHigh()} class="bg-black text-white rounded-md p-2"
					>Loop High</button
				>
			</div>

			<span class:text-gray-200={grid.mode !== 'loop'}>{grid.count_run} / {grid.count_total}</span>
		</section>
		<section>
			<span class="font-semibold text-xl" class:text-red-500={grid.mode === 'guess'}>Guess</span>
			<div class="flex gap-x-6">
				<button onclick={() => grid.guessLow()} class="bg-black text-white rounded-md p-2"
					>Guess Low</button
				>
				<button onclick={() => grid.guessHigh()} class="bg-black text-white rounded-md p-2"
					>Loop High</button
				>
			</div>
			<span class:text-gray-200={grid.mode !== 'guess'}
				>Guesses: {grid.count_guess} / {grid.count_fields} Found: {grid.count_found} / {grid.count_filled}</span
			>
		</section>
	</aside>
</div>
