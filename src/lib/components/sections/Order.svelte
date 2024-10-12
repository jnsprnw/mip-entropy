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
					onclick={() => grid.setObserver(undefined)}
					class="bg-black text-white rounded-md p-2">Set observer to none</button
				>
				<button onclick={() => grid.setObserver('alice')} class="bg-black text-white rounded-md p-2"
					>Set observer to Alice</button
				>
				<button onclick={() => grid.setObserver('bob')} class="bg-black text-white rounded-md p-2"
					>Set observer to Bob</button
				>
			</div>
			Observer: {grid.observer}
		</section>
	</aside>
</div>
