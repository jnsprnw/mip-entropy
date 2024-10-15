<script lang="ts">
	import { getContext } from 'svelte';

	const { xScale, yScale, width } = getContext('LayerCake');

	import { scaleLinear } from 'd3-scale';

	const opacity = scaleLinear().domain([0, 1]).range([0.7, 0.3]);
	const blur = scaleLinear().domain([0, 1]).range([2, 10]);

	const grid = getContext('Grid');
</script>

<defs>
	<filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
		<feGaussianBlur in="SourceAlpha" stdDeviation={blur(grid.cy)} />
		<feOffset dx="3" dy="3" result="offsetblur" />
		<feMerge>
			<feMergeNode in="offsetblur" />
			<feMergeNode in="SourceGraphic" />
		</feMerge>
	</filter>
</defs>

<g>
	<circle cx={$xScale(grid.cx)} cy={$yScale(grid.cy)} r={grid.radius * $width} />
	{#if grid.mode === 'vertical'}
		<path
			d="M {$xScale(grid.wall_x)} {$yScale(0)} V {$yScale(1)}"
			class="stroke"
			class:stroke-black={!grid.wall_highlight}
			class:stroke-red-500={grid.wall_highlight}
		/>
	{:else if grid.mode === 'diagonal'}
		<path
			d="M {$xScale(grid.wall_x1)} {$yScale(grid.wall_y1)} L {$xScale(grid.wall_x2)} {$yScale(
				grid.wall_y2
			)}"
			class="stroke"
			class:stroke-black={!grid.wall_highlight}
			class:stroke-red-500={grid.wall_highlight}
		/>
	{/if}
	{#if grid.has_shadow}
		<circle
			filter="url(#shadow)"
			style="opacity: {opacity(grid.cy)}"
			transform="scale(1 0.2)"
			cx={$xScale(grid.cx)}
			cy={$yScale(0)}
			transform-origin="{$xScale(grid.cx)} {$yScale(0)}"
			r={grid.radius * $width}
		/>
	{/if}
</g>
