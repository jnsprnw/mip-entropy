<script lang="ts">
	import { getGridState } from '$grid/grid-state.svelte';
	import Gauge from '$lib/components/gauge/Gauge.svelte';
	import { OBSERVER_ALICE, OBSERVER_BOB } from '$config';
	import { fade } from 'svelte/transition';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { observer, entropy_value, is_visible_alice, is_visible_bob } = $derived(grid);
</script>

{#if typeof entropy_value === 'number'}
	<div class="col-start-[gaugeA] justify-self-end row-start-1 w-[65px] p-2 h-full">
		<Gauge value={entropy_value} />
	</div>
{:else if Array.isArray(entropy_value) && entropy_value.length === 2}
	{#if is_visible_alice}
		<div
			in:fade
			out:fade
			class="col-start-[gaugeA] justify-self-end row-start-1 w-[65px] p-2 h-full"
			class:opacity-20={observer !== OBSERVER_ALICE}
		>
			<Gauge value={entropy_value[0]} observer={OBSERVER_ALICE} />
		</div>
	{/if}
	{#if is_visible_bob}
		<div
			in:fade
			out:fade
			class="col-start-[gaugeB] justify-self-start row-start-1 w-[65px] p-2 h-full"
			class:opacity-20={observer !== OBSERVER_BOB}
		>
			<Gauge value={entropy_value[1]} observer={OBSERVER_BOB} />
		</div>
	{/if}
{/if}
