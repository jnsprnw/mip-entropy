<script lang="ts">
	import { getContext } from 'svelte';
	import { getGridState } from '$grid/grid-state.svelte';
	import Particles from '$grid/move/Particles.svelte';
	const gridState = getGridState();
	const { grid, padding } = $derived(gridState);
	import { WALL_WIDTH } from '$config';

	const { yScale } = getContext('LayerCake');

	const { wall_x, wall_highlight, show_wall } = $derived(grid);
</script>

<g>
	<Particles />
	{#if show_wall}
		<path
			d="M {wall_x} {$yScale(0) - 1} V {$yScale(1) - padding.top}"
			style="stroke-width: {WALL_WIDTH}px;"
			class:stroke-wall={!wall_highlight}
			class:stroke-accent-dark={wall_highlight}
		/>
	{/if}
</g>
