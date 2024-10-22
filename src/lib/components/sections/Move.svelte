<script lang="ts">
	import Grid from '$lib/components/grid/Grid.svelte';
	import { createMove } from '$lib/components/grid/grid-move.svelte.ts';
	import { setContext } from 'svelte';
	import { onMount } from 'svelte';

	const grid = createMove();

	onMount(() => {
		function move() {
			grid.move();
			requestAnimationFrame(move);
		}
		move();
	});
	setContext('Grid', grid);
</script>

<div class="flex gap-x-6">
	<Grid type="linear" padding={grid.padding} />

	<aside class="flex flex-col m-6 gap-y-6">
		<section class="flex flex-col gap-y-3">
			<div class="flex gap-x-6">
				<button onclick={() => grid.changeMode()} class="bg-black text-white rounded-md p-2"
					>Change mode</button
				>
				<button onclick={() => grid.changeShadow()} class="bg-black text-white rounded-md p-2"
					>Change shadow</button
				>
				<button onclick={() => grid.resetWall()} class="bg-black text-white rounded-md p-2"
					>Reset wall</button
				>
			</div>

			Mode: {grid.mode}<br />
			Shadow: {grid.has_shadow}<br />
			Site of ball: {grid.is_ball_left ? 'left' : 'right'}
		</section>
	</aside>
</div>
