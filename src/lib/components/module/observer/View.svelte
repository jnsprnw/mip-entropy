<script lang="ts">
	import { fade } from 'svelte/transition';
	import { getGridState } from '$grid/grid-state.svelte';
	import { getObserverDetail } from '$grid/utils-order';
	import { OBSERVER_BOB } from '$config';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { observer } = $derived(grid);

	const text = $derived(observer === OBSERVER_BOB ? 'text-highlight-bob' : 'text-highlight');
</script>

{#if observer}
	<span
		out:fade
		in:fade
		class="{text} col-start-[grid] col-end-[grid] row-start-1 z-10 place-self-center self-start font-semibold uppercase tracking-wider text-base/none"
	>
		{getObserverDetail(observer).label}’s view
	</span>
{/if}
