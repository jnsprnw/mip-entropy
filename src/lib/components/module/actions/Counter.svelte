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
		class="col-start-[left] flex flex-col items-center col-end-[right] justify-self-center row-start-2"
	>
		<span class="tabular-nums text-xl font-medium">
			<em class="text-primary-dark not-italic">{count_run_str}</em> / {count_total_str}
		</span>
		<span class="text-xs uppercase font-medium tracking-wider">configurations explored</span>
	</div>
{/if}
