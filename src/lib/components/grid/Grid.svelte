<script lang="ts">
	import { LayerCake, Svg, Html } from 'layercake';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { range } from 'd3-array';
	import Base from './Base.svelte';
	import Fields from './Fields.svelte';
	import Move from './Move.svelte';
	import Pulley from './Pulley.svelte';
	import Guess from './interactives/Guess.svelte';
	import { getGridState } from '$grid/grid-state.svelte';
	import { GRID_SIZE } from '$config';

	const gridState = getGridState();
	const { grid, width, padding } = $derived(gridState);

	const scale = $derived(grid.isLinear ? scaleLinear() : scaleBand());

	const domain = $derived(grid.isLinear ? [0, 1] : range(0, GRID_SIZE));
</script>

<div class="w-full flex items-center h-full" bind:clientHeight={gridState.height}>
	{#if width}
		<div
			class="relative w-full"
			style="aspect-ratio: {width} / {gridState.height};"
			bind:clientWidth={null,
			(v) => {
				grid.width = v - padding.left - padding.right;
			}}
		>
			<LayerCake {padding} xDomain={domain} yDomain={domain} xScale={scale} yScale={scale}>
				<Svg>
					<Base />
					{#if grid.isLinear}
						<Move />
						<Pulley />
					{:else}
						<Fields />
					{/if}
				</Svg>

				<Html>
					<Guess />
				</Html>
			</LayerCake>
		</div>
	{/if}
</div>
