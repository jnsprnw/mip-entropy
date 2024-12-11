<script lang="ts">
	import { getFill } from '$lib/utils/utils';
	import { getContext } from 'svelte';
	import { getGridState } from '$grid/grid-state.svelte';
	import Circle from '$grid/shapes/Circle.svelte';

	const { xScale, yScale } = getContext('LayerCake');

	const gridState = getGridState();
	const { grid, entity_size } = $derived(gridState);
	const { particles, observer } = $derived(grid);
</script>

<g>
	{#each particles as { cx, cy, color: fill }}
		<Circle cx={$xScale(cx)} cy={$yScale(cy)} r={entity_size / 2} color={getFill(observer, fill)} />
	{/each}
</g>
