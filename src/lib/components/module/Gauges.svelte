<script lang="ts">
	import { getGridState } from '$grid/grid-state.svelte';
	import Gauge from '$lib/components/gauge/Gauge.svelte';
	import { OBSERVER_ALICE, OBSERVER_BOB } from '$config';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { observer, entropy_value } = $derived(grid);
</script>

{#if typeof entropy_value === 'number'}
	<div class="col-start-[gaugeA] row-start-1 w-[60px] md:w-[75px] lg:w-[90px] p-2 h-full">
		<Gauge value={entropy_value} />
	</div>
{:else if Array.isArray(entropy_value) && entropy_value.length === 2}
	<div
		class="col-start-[gaugeA] row-start-1 w-[60px] md:w-[75px] lg:w-[90px] p-2 h-full"
		class:opacity-20={observer !== OBSERVER_ALICE}
	>
		<Gauge value={entropy_value[0]} observer={OBSERVER_ALICE} />
	</div>
	<div
		class="col-start-[gaugeB] row-start-1 w-[60px] md:w-[75px] lg:w-[90px] p-2 h-full"
		class:opacity-20={observer !== OBSERVER_BOB}
	>
		<Gauge value={entropy_value[1]} observer={OBSERVER_BOB} />
	</div>
{/if}
