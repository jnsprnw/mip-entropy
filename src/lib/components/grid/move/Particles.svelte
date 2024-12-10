<script lang="ts">
	import { getFill, isAlice } from '$lib/utils/utils';
	import { getContext } from 'svelte';
	import { getGridState } from '$grid/grid-state.svelte';
	import Square from '$grid/shapes/Square.svelte';
	import Circle from '$grid/shapes/Circle.svelte';
	import Triangle from '$grid/shapes/Triangle.svelte';
	import { ENTITY_SHAPE_SQUARE, ENTITY_SHAPE_CIRCLE, ENTITY_SHAPE_TRIANGLE } from '$config';

	const { xScale, yScale, width } = getContext('LayerCake');

	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { particles, radius, observer } = $derived(grid);

	const r = $derived<number>(radius * $width - 2);
</script>

<g>
	{#each particles as { cx, cy, shape, color: fill }}
		{@const x = $xScale(cx)}
		{@const y = $yScale(cy)}
		{@const color = getFill(observer, fill)}
		{#if isAlice(observer) || shape === ENTITY_SHAPE_CIRCLE}
			<Circle cx={x} cy={y} {r} {color} isBlur={isAlice(observer)} />
		{:else if shape === ENTITY_SHAPE_SQUARE}
			<Square {x} {y} size={r} {color} />
		{:else if shape === ENTITY_SHAPE_TRIANGLE}
			<Triangle {x} {y} size={r} {color} />
		{/if}
	{/each}
</g>
