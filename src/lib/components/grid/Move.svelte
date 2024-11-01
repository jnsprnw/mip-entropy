<script lang="ts">
	import { getSimpleState } from './grid-simple.svelte';

	const { xScale, yScale, width, padding } = getContext('LayerCake');

	import { scaleLinear } from 'd3-scale';

	const opacity = scaleLinear().domain([0, 1]).range([0.7, 0.3]);
	const blur = scaleLinear().domain([0, 1]).range([2, 10]);

	const grid = getSimpleState();
	const {
		cx,
		cy,
		radius,
		mode,
		wall_x,
		wall_x1,
		wall_x2,
		wall_highlight,
		wall_y1,
		wall_y2,
		has_shadow
	} = $derived(grid);
</script>

<defs>
	<filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
		<feGaussianBlur in="SourceAlpha" stdDeviation={blur(cy)} />
		<feOffset dx="3" dy="3" result="offsetblur" />
		<feMerge>
			<feMergeNode in="offsetblur" />
			<feMergeNode in="SourceGraphic" />
		</feMerge>
	</filter>
</defs>

<g>
	<circle
		cx={$xScale(cx)}
		cy={$yScale(cy)}
		class="fill-slate-600 stroke-2 stroke-slate-900"
		r={radius * $width - 2}
	/>
	{#if mode === 'vertical'}
		<path
			d="M {$xScale(wall_x)} {$yScale(0)} V {$yScale(1)}"
			class="stroke-2"
			class:stroke-amber-500={!wall_highlight}
			class:stroke-amber-600={wall_highlight}
		/>
	{:else if mode === 'diagonal'}
		<path
			d="M {$xScale(wall_x1)} {$yScale(wall_y1)} L {$xScale(wall_x2)} {$yScale(wall_y2)}"
			class="stroke-2"
			class:stroke-amber-500={!wall_highlight}
			class:stroke-amber-600={wall_highlight}
		/>
	{/if}
	{#if has_shadow}
		<circle
			class="fill-slate-500"
			style="opacity: {opacity(cy)}"
			transform="scale(1 0.2)"
			cx={$xScale(cx)}
			cy={$yScale(0)}
			transform-origin="{$xScale(cx)} {$yScale(0) + $padding.bottom}"
			r={radius * $width}
		/>
	{/if}
</g>
