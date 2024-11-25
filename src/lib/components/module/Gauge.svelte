<script lang="ts">
	import { getGridState } from '$lib/components/grid/grid-state.svelte';
	import Gauge from '$lib/components/gauge/Gauge.svelte';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { entropy_value } = $derived(grid);
</script>

{#if typeof entropy_value === 'number'}
	<div class="col-start-2 row-start-1 w-full p-2 h-full">
		<Gauge value={entropy_value} label="Entropy according to Alice" />
	</div>
{:else if Array.isArray(entropy_value) && entropy_value.length === 2}
	<div class="col-start-2 row-start-1 w-full p-2 h-full">
		<Gauge value={entropy_value[0]} label="Entropy according to Alice" />
	</div>
	<div class="col-start-4 row-start-1 w-full p-2 h-full">
		<Gauge value={entropy_value[1]} label="Entropy according to Bob" />
	</div>
{/if}
