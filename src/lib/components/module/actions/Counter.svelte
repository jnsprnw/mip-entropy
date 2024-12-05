<script lang="ts">
	import { getGridState } from '$grid/grid-state.svelte';
	import { MODE_LOOP } from '$config';
	const gridState = getGridState();
	import { fade } from 'svelte/transition';
	const { grid } = $derived(gridState);
	const { mode, count_run, count_total, show_count } = $derived(grid);

	const formatNumber = new Intl.NumberFormat('en').format;

	const count_run_str = $derived(formatNumber(count_run));
	const count_total_str = $derived(formatNumber(count_total));
</script>

{#if mode === MODE_LOOP && show_count && count_run}
	<div
		in:fade
		out:fade
		class="col-start-[left] col-end-[right] justify-self-center row-start-2 text-xs"
	>
		<span class="tabular-nums">{count_run_str} / {count_total_str} configurations explored</span>
	</div>
{/if}
