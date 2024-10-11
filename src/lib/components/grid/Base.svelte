<script lang="ts">
	import { getContext } from 'svelte';

	const { yRange, xRange, xScale, xDomain, yScale, yDomain } = getContext('LayerCake');

	$: step = $xScale.step();
	$: x0 = $xRange.at(0);
	$: x1 = $xRange.at(-1);
	$: y0 = $yRange.at(0);
	$: y1 = $yRange.at(-1);
</script>

<g class="base" transform="translate({-step / 2}, {-step / 2})">
	<path d="M {x0} {y0} H {x1 + step} V {y1 + step} H {x0} Z" class="stroke stroke-red-500 fill-none"
	></path>
	{#each $xDomain as tick, i}
		{#if i !== 0}
			<path d="M {$xScale(tick)} {y0} V {y1 + step}" class="stroke stroke-red-500" />
		{/if}
	{/each}
	{#each $yDomain as tick, i}
		{#if i !== 0}
			<path d="M {x0} {$yScale(tick)} H {x1 + step}" class="stroke stroke-red-500" />
		{/if}
	{/each}
</g>
