<script lang="ts">
	import Alice from '$icons/Alice.svelte';
	import Bob from '$icons/Bob.svelte';
	import { fade } from 'svelte/transition';
	import { getGridState } from '$grid/grid-state.svelte';
	import { getObserverDetail } from '$grid/utils-order';
	import { OBSERVER_ALICE, OBSERVER_BOB } from '$config';
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
	class="hidden md:flex flex-col gap-y-1 col-start-[alice] row-start-1 w-[70px] lg:w-[120px] lg:p-3 text-center text-highlight"
	class:opacity-50={!is_visible_alice}
>
	<Alice />
	<span class="text-base/none mt-2 uppercase tracking-wider font-semibold">
		{getObserverDetail(OBSERVER_ALICE).label}
	</span>
	<span class="text-sm/none">
		{getObserverDetail(OBSERVER_ALICE).description}
	</span>
</div>

<div
	class="hidden md:flex flex-col col-start-[bob] row-start-1 w-[70px] gap-y-1 lg:w-[120px] lg:p-3 text-center text-highlight-bob"
	class:opacity-50={!is_visible_bob}
>
	<Bob />
	<span class="text-base/none mt-2 uppercase tracking-wider font-semibold">
		{getObserverDetail(OBSERVER_BOB).label}
	</span>
	<span class="text-sm/none">
		{getObserverDetail(OBSERVER_BOB).description}
	</span>
</div>
