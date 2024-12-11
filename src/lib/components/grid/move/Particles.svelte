<script lang="ts">
	import { getFill } from '$lib/utils/utils';
	import { getContext } from 'svelte';
	import { getGridState } from '$grid/grid-state.svelte';
	import Circle from '$grid/shapes/Circle.svelte';

	const { xScale, yScale } = getContext('LayerCake');

	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { particles, observer, radius } = $derived(grid);
</script>

<g>
	{#each particles as { cx, cy, color: fill }}
		<Circle cx={$xScale(cx)} cy={$yScale(cy)} r={radius} color={getFill(observer, fill)} />
	{/each}
</g>
