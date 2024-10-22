<script lang="ts">
	import Grid from '$lib/components/grid/Grid.svelte';
	import { createOrder } from '$lib/components/grid/grid-order.svelte.ts';
	import { setContext } from 'svelte';

	const grid = createOrder(6);
	setContext('Grid', grid);
</script>

<div class="flex gap-x-6">
	<Grid />

	<aside class="flex flex-col m-6 gap-y-6">
		<section class="flex flex-col gap-y-3">
			<div class="flex gap-x-6">
				<button
					onclick={() => grid.shuffle()}
					class="bg-slate-300 text-blue-900 border border-blue-900 rounded-md p-2">Shuffle</button
				>
			</div>
			<div class="flex gap-x-6">
				<button
					class:bg-amber-500={typeof grid.observer === 'undefined'}
					class:bg-slate-300={typeof grid.observer !== 'undefined'}
					onclick={() => grid.setObserver(undefined)}
					class="border border-blue-900 text-blue-900 rounded-md p-2">Set observer to none</button
				>
				<button
					class:bg-amber-500={grid.observer === 'alice'}
					class:bg-slate-300={grid.observer !== 'alice'}
					onclick={() => grid.setObserver('alice')}
					class="border border-blue-900 text-blue-900 rounded-md p-2">Set observer to Alice</button
				>
				<button
					class:bg-amber-500={grid.observer === 'bob'}
					class:bg-slate-300={grid.observer !== 'bob'}
					onclick={() => grid.setObserver('bob')}
					class="border border-blue-900 text-blue-900 rounded-md p-2">Set observer to Bob</button
				>
			</div>
			<div class="flex gap-x-6">
				<button
					disabled={!grid.can_sort}
					class:bg-amber-500={grid.is_sorting}
					class:bg-slate-300={!grid.is_sorting && grid.can_sort}
					onclick={() => (grid.is_sorting ? grid.stopLoop() : grid.sort())}
					class="text-blue-900 border border-blue-900 rounded-md p-2"
					class:text-slate-300={!grid.can_sort}>{grid.is_sorting ? 'Sorting …' : 'Sort'}</button
				>
			</div>
			Observer: {grid.observer}<br />
			Sort by: {grid.sort_by}<br />
			Is sorted: {grid.is_sorted ? 'yes' : 'no'}<br />
			Entropy: {grid.entropy}<br />
			Max entropy: {grid.max_entropy}<br />
			<progress max={grid.max_entropy} value={grid.entropy}>{grid.entropy}%</progress>
		</section>
	</aside>
</div>
