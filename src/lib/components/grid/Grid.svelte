<script lang="ts">
	import { LayerCake, Svg } from 'layercake';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { range } from 'd3-array';
	import Base from './Base.svelte';
	import Fields from './Fields.svelte';
	import Move from './Move.svelte';
	import Pulley from './Pulley.svelte';
	import { getSimpleState } from './grid-simple.svelte';

	const grid = getSimpleState();

	const { type = 'point' } = $props();
	const scale = $derived(type === 'point' ? scaleBand() : scaleLinear());

	const domain = $derived(type === 'point' ? range(0, grid.size) : [0, 1]);
</script>

<div class="h-96 w-96 m-2">
	<div class="grid-container h-full w-full relative">
		<LayerCake
			padding={grid.padding}
			xDomain={domain}
			yDomain={domain}
			xScale={scale}
			yScale={scale}
		>
			<Svg>
				<Base />
				{#if type === 'point'}
					<Fields />
				{:else}
					<Move />
					<Pulley />
				{/if}
			</Svg>
		</LayerCake>
	</div>
</div>
