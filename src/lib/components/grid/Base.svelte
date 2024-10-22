<script lang="ts">
	import { getContext } from 'svelte';

	const { yRange, xRange, xScale, xDomain, yScale, yDomain } = getContext('LayerCake');

	$: x0 = $xRange.at(0);
	$: x1 = $xRange.at(-1);
	$: y0 = $yRange.at(0);
	$: y1 = $yRange.at(-1);
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
				stroke-dasharray="6 3"
			/>
		{/if}
	{/each}
	{#each $yDomain as tick, i}
		{#if i !== 0}
			<path
				d="M {x0} {$yScale(tick)} H {x1}"
				class="stroke stroke-blue-900 opacity-50"
				stroke-dasharray="6 3"
			/>
		{/if}
	{/each}
</g>
