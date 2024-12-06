<script lang="ts">
	import { getContext } from 'svelte';
	import { getGridState } from '$grid/grid-state.svelte';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	import { MODE_GUESS } from '$config';

	const { yRange, xRange, xScale, xDomain, yScale, yDomain } = getContext('LayerCake');

	// For some reason, the range is not always min/max
	const x = $derived($xRange.sort((a: number, b: number) => a - b));
	const y = $derived($yRange.sort((a: number, b: number) => a - b));

	const x0 = $derived(x.at(0));
	const x1 = $derived(x.at(-1));
	const y0 = $derived(y.at(0));
	const y1 = $derived(y.at(-1));

	const rx = 5;

	const rect_width = $derived(x1 - x0);
	const rect_height = $derived(y1 - y0);
</script>

<g>
	<rect
		x={x0}
		y={y0}
		width={rect_width}
		height={rect_height}
		{rx}
		stroke-linejoin="round"
		class="fill-white"
	></rect>
	{#if grid.mode !== MODE_GUESS}
		{#each $xDomain as tick, i}
			{#if i !== 0}
				<path d="M {$xScale(tick)} {y0} V {y1}" class="fill-none stroke stroke-grid-inner" />
			{/if}
		{/each}
		{#each $yDomain as tick, i}
			{#if i !== 0}
				<path d="M {x0} {$yScale(tick)} H {x1}" class="fill-none stroke stroke-grid-inner" />
			{/if}
		{/each}
	{/if}
	{#if grid.grid_area_active}
		<path
			d="M {$xScale(grid.grid_area_active)} {y1} V {y1 - $yScale(grid.grid_area_active)} H {x0}"
			class="fill-none stroke stroke-[1.4px] stroke-orange-400"
			stroke-dasharray="4 4"
		/>
	{/if}
	<rect
		x={x0}
		y={y0}
		width={rect_width}
		height={rect_height}
		{rx}
		stroke-linejoin="round"
		class="stroke-2 stroke-grid-outer fill-none"
	></rect>
</g>
