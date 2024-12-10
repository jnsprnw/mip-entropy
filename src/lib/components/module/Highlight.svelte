<script lang="ts">
	import { isAlice } from '$lib/utils/utils';
	import { fade } from 'svelte/transition';
	import { getGridState } from '$grid/grid-state.svelte';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { observer, hasObserver } = $derived(grid);

	const highlight_area = $derived(
		isAlice(observer)
			? 'col-start-1 col-end-3 md:col-end-4'
			: 'col-start-2 md:col-start-3 col-end-4 md:col-end-6 '
	);
</script>

{#if hasObserver}
	<div
		out:fade
		in:fade
		class="bg-white/50 transition-all -z-10 w-full h-full rounded-3xl row-start-1 row-end-3 {highlight_area}"
		role="presentation"
	></div>
{/if}
