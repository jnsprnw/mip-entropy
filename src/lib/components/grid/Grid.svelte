<script lang="ts">
	import { LayerCake, Svg, Html } from 'layercake';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { range } from 'd3-array';
	import Base from './Base.svelte';
	import Fields from './Fields.svelte';
	import Move from './Move.svelte';
	import Pulley from './Pulley.svelte';
	import { getGridState } from '$grid/grid-state.svelte';
	import { LAYOUT_LINEAR, GRID_SIZE } from '$config';
	import SideSelection from './interactives/SideSelection.svelte';

	const gridState = getGridState();
	const { grid, height, currentState, padding } = $derived(gridState);
	import { ID as id_move } from '$lib/components/grid/grid-move.svelte';
	import { ID as id_simple } from '$lib/components/grid/grid-simple.svelte';
	import Guess from './interactives/Guess.svelte';
	const scale = $derived(grid.layout === LAYOUT_LINEAR ? scaleLinear() : scaleBand());

	const domain = $derived(grid.layout === LAYOUT_LINEAR ? [0, 1] : range(0, GRID_SIZE));
</script>

<div class="w-full flex items-center h-full bg-red-50" bind:clientWidth={gridState.width}>
	{#if height}
		<div class="grid-container w-full relative" style="height: {height}px">
			<LayerCake {padding} xDomain={domain} yDomain={domain} xScale={scale} yScale={scale}>
				<Svg>
					<Base />
					{#if grid.layout === LAYOUT_LINEAR}
						<Move />
						<Pulley />
					{:else}
						<Fields />
					{/if}
				</Svg>
				{#if currentState === id_move || currentState === id_simple}
					<Html>
						<SideSelection />
						<Guess />
					</Html>
				{/if}
			</LayerCake>
		</div>
	{/if}
</div>
