<script lang="ts">
	import { LayerCake, Svg } from 'layercake';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { range } from 'd3-array';
	import Base from './Base.svelte';
	import Fields from './Fields.svelte';
	import Move from './Move.svelte';
	import Pulley from './Pulley.svelte';
	import { getGridState } from './grid-state.svelte';

	const gridState = getGridState();
	const { grid } = $derived(gridState);

	const scale = $derived(grid.layout === 'linear' ? scaleLinear() : scaleBand());

	const domain = $derived(grid.layout === 'linear' ? [0, 1] : range(0, grid.size));
	const padding = { bottom: 10, left: 50, top: 30, right: 50 };
	let h = $state<number>();
</script>

<div class="h-96 m-2" bind:clientHeight={h}>
	<div
		class="grid-container h-full relative"
		style="width: {h + padding.left + padding.right - padding.top - padding.bottom}px"
	>
		<LayerCake {padding} xDomain={domain} yDomain={domain} xScale={scale} yScale={scale}>
			<Svg>
				<Base />
				{#if grid.layout === 'linear'}
					<Move />
					<Pulley />
				{:else}
					<Fields />
				{/if}
			</Svg>
		</LayerCake>
	</div>
</div>
