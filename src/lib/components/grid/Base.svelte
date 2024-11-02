<script lang="ts">
	import { getContext } from 'svelte';
	import { getGridState } from './grid-state.svelte';
	import { MODE_GUESS } from '$config';

	const { yRange, xRange, xScale, xDomain, yScale, yDomain } = getContext('LayerCake');

	const gridState = getGridState();
	const { grid } = $derived(gridState);

	const x0 = $derived($xRange.at(0));
	const x1 = $derived($xRange.at(-1));
	const y0 = $derived($yRange.at(0));
	const y1 = $derived($yRange.at(-1));

	const dashArray = $derived(grid.mode === MODE_GUESS ? 'none' : '6 3');
</script>

<g class="base" transform="translate({0}, {0})">
	<path
		d="M {x0} {y0} H {x1} V {y1} H {x0} Z"
		stroke-linejoin="round"
		class="stroke-2 stroke-blue-900 fill-none"
	></path>
	{#each $xDomain as tick, i}
		{#if i !== 0}
			<path
				d="M {$xScale(tick)} {y0} V {y1}"
				class="stroke stroke-blue-900 opacity-50"
				stroke-dasharray={dashArray}
			/>
		{/if}
	{/each}
	{#each $yDomain as tick, i}
		{#if i !== 0}
			<path
				d="M {x0} {$yScale(tick)} H {x1}"
				class="stroke stroke-blue-900 opacity-50"
				stroke-dasharray={dashArray}
			/>
		{/if}
	{/each}
</g>
