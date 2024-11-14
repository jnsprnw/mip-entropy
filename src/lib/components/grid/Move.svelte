<script lang="ts">
	import { getContext } from 'svelte';
	import { getGridState } from './grid-state.svelte';
	import Particles from '$lib/components/grid/move/Particles.svelte';
	const gridState = getGridState();
	const { grid } = $derived(gridState);

	const { xScale, yScale } = getContext('LayerCake');

	const { wall_x, wall_highlight, show_wall } = $derived(grid);
</script>

<g>
	<Particles />

	{#if show_wall}
		<path
			d="M {$xScale(wall_x)} {$yScale(0)} V {$yScale(1)}"
			class="stroke-2"
			class:stroke-amber-500={!wall_highlight}
			class:stroke-amber-600={wall_highlight}
		/>
	{/if}
</g>
