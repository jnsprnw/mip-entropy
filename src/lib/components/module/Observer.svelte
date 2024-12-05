<script lang="ts">
	import Alice from '$icons/Alice.svelte';
	import Bob from '$icons/Bob.svelte';
	import { fade } from 'svelte/transition';
	import { getGridState } from '$grid/grid-state.svelte';
	import { OBSERVER_ALICE } from '$config';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { observer, hasObserver, is_visible_alice, is_visible_bob } = $derived(grid);

	const highlight_area = $derived(
		observer === OBSERVER_ALICE
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

<div
	class="hidden md:block col-start-[alice] row-start-1 w-[150px] sm:p-3 md:p-5"
	class:opacity-50={!is_visible_alice}
>
	<Alice />
</div>

<div
	class="hidden md:block col-start-[bob] row-start-1 w-[150px] sm:p-3 md:p-5"
	class:opacity-50={!is_visible_bob}
>
	<Bob />
</div>
