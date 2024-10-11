<script lang="ts">
	import { getContext } from 'svelte';
	import { LayerCake, Svg } from 'layercake';
	import { scalePoint } from 'd3-scale';
	import { range } from 'd3-array';
	import Base from './Base.svelte';
	import Fields from './Fields.svelte';

	const grid = getContext('Grid');

	$inspect(grid.size);

	const xDomain = $derived(range(0, grid.size));
	const yDomain = $derived(range(0, grid.size));
</script>

<div class="h-96 w-96 m-12">
	<div class="grid-container h-full w-full relative">
		<LayerCake
			padding={{ bottom: 0, left: 0, top: 0, right: 0 }}
			{xDomain}
			{yDomain}
			xScale={scalePoint()}
			yScale={scalePoint()}
		>
			<Svg>
				<Base />
				<Fields />
			</Svg>
		</LayerCake>
	</div>
</div>
