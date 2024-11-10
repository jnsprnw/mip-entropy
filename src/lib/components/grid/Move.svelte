<script lang="ts">
	import { getContext } from 'svelte';
	import { getGridState } from './grid-state.svelte';
	const gridState = getGridState();
	const { grid } = $derived(gridState);

	const { xScale, yScale, width } = getContext('LayerCake');

	const { wall_x, wall_highlight, particles, radius } = $derived(grid);
</script>

<g>
	{#each particles as { cx, cy }}
		<circle
			cx={$xScale(cx)}
			cy={$yScale(cy)}
			class="fill-slate-600 stroke-2 stroke-slate-900"
			r={radius * $width - 2}
		/>
	{/each}

	<path
		d="M {$xScale(wall_x)} {$yScale(0)} V {$yScale(1)}"
		class="stroke-2"
		class:stroke-amber-500={!wall_highlight}
		class:stroke-amber-600={wall_highlight}
	/>
</g>
