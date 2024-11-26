<script lang="ts">
	import { LayerCake, Svg } from 'layercake';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { range } from 'd3-array';
	import Base from './Base.svelte';
	import Fields from './Fields.svelte';
	import Move from './Move.svelte';
	import Pulley from './Pulley.svelte';
	import { getGridState } from './grid-state.svelte';
	import { PADDING_GRID, LAYOUT_LINEAR, GRID_SIZE } from '$config';

	const gridState = getGridState();
	const { grid, height } = $derived(gridState);

	const scale = $derived(grid.layout === LAYOUT_LINEAR ? scaleLinear() : scaleBand());

	const domain = $derived(grid.layout === LAYOUT_LINEAR ? [0, 1] : range(0, GRID_SIZE));

	// let height = $state<number>(0);
	// const width = $derived(
	// 	height + PADDING_GRID.left + PADDING_GRID.right - PADDING_GRID.top - PADDING_GRID.bottom
	// );
</script>

<div class="w-full flex items-center h-full" bind:clientWidth={gridState.width}>
	{#if height}
		<div class="grid-container w-full relative" style="height: {height}px">
			<LayerCake
				padding={PADDING_GRID}
				xDomain={domain}
				yDomain={domain}
				xScale={scale}
				yScale={scale}
			>
				<Svg>
					<Base />
					{#if grid.layout === LAYOUT_LINEAR}
						<Move />
						<Pulley />
					{:else}
						<Fields />
					{/if}
				</Svg>
			</LayerCake>
		</div>
	{/if}
</div>
