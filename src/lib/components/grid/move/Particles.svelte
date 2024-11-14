<script lang="ts">
	import { getFill } from '$lib/utils/utils';
	import { getContext } from 'svelte';
	import { getGridState } from '$lib/components/grid/grid-state.svelte';
	import Square from '$lib/components/grid/shapes/Square.svelte';
	import Circle from '$lib/components/grid/shapes/Circle.svelte';
	import Triangle from '$lib/components/grid/shapes/Triangle.svelte';

	const { xScale, yScale, width } = getContext('LayerCake');

	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { particles, radius, observer } = $derived(grid);

	const r = $derived(radius * $width - 2);
</script>

<g>
	{#each particles as { cx, cy, shape, color: fill }}
		{@const x = $xScale(cx)}
		{@const y = $yScale(cy)}
		{@const color = getFill(observer, fill)}
		{#if observer === 'alice' || shape === 'circle'}
			<Circle cx={x} cy={y} {r} {color} isBlur={true} />
		{:else if shape === 'square'}
			<Square {x} {y} {r} {color} />
		{:else if shape === 'triangle'}
			<Triangle {x} {y} {r} {color} />
		{/if}
	{/each}
</g>
