<script lang="ts">
	import Alice from '$lib/icons/Alice.svelte';
	import Bob from '$lib/icons/Bob.svelte';
	import { fade } from 'svelte/transition';
	import { getGridState } from '$lib/components/grid/grid-state.svelte';
	import { OBSERVER_ALICE } from '$config';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { observer, hasObserver } = $derived(grid);

	const highlight_area = $derived(
		observer === OBSERVER_ALICE ? 'col-start-1 col-end-4' : 'col-start-3 col-end-6 '
	);
</script>

{#if hasObserver}
	<div
		out:fade
		in:fade
		class="bg-white/50 w-full h-full rounded-3xl row-start-1 row-end-3 {highlight_area}"
		role="presentation"
	></div>

	<div class="col-start-1 row-start-1 p-5"><Alice /></div>
	<div class="col-start-5 row-start-1 p-5"><Bob /></div>
{/if}
