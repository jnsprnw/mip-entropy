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
				<button onclick={() => grid.shuffle()} class="bg-black text-white rounded-md p-2"
					>Shuffle</button
				>
			</div>
			<div class="flex gap-x-6">
				<button
					class:bg-red-500={typeof grid.observer === 'undefined'}
					onclick={() => grid.setObserver(undefined)}
					class="bg-black text-white rounded-md p-2">Set observer to none</button
				>
				<button
					class:bg-red-500={grid.observer === 'alice'}
					onclick={() => grid.setObserver('alice')}
					class="bg-black text-white rounded-md p-2">Set observer to Alice</button
				>
				<button
					class:bg-red-500={grid.observer === 'bob'}
					onclick={() => grid.setObserver('bob')}
					class="bg-black text-white rounded-md p-2">Set observer to Bob</button
				>
			</div>
			<div class="flex gap-x-6">
				<button
					disabled={!grid.can_sort}
					class:bg-red-500={grid.is_sorting}
					onclick={() => (grid.is_sorting ? grid.stopLoop() : grid.sort())}
					class="bg-black text-white rounded-md p-2"
					class:bg-gray-500={!grid.can_sort}>{grid.is_sorting ? 'Sorting …' : 'Sort'}</button
				>
			</div>
			Observer: {grid.observer}<br />
			Sort by: {grid.sort_by}<br />
			Is sorted: {grid.is_sorted ? 'yes' : 'no'}<br />
			Entropy: {grid.entropy}
		</section>
	</aside>
</div>
