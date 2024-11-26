<script lang="ts">
	import { getGridState } from '$lib/components/grid/grid-state.svelte';
	import Gauge from '$lib/components/gauge/Gauge.svelte';
	import { getObserverDetail } from '$lib/components/grid/utils-order';
	import { OBSERVER_ALICE, OBSERVER_BOB } from '$config';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { entropy_value, is_visible_alice, is_visible_bob } = $derived(grid);
</script>

{#if typeof entropy_value === 'number'}
	<div class="col-start-2 row-start-1 w-full p-2 h-full">
		<Gauge value={entropy_value} label="Entropy" />
	</div>
{:else if Array.isArray(entropy_value) && entropy_value.length === 2}
	<div class="col-start-2 row-start-1 w-full p-2 h-full" class:opacity-50={!is_visible_alice}>
		<Gauge value={entropy_value[0]} label={getObserverDetail(OBSERVER_ALICE).label} />
	</div>
	<div class="col-start-4 row-start-1 w-full p-2 h-full" class:opacity-50={!is_visible_bob}>
		<Gauge value={entropy_value[1]} label={getObserverDetail(OBSERVER_BOB).label} />
	</div>
{/if}
