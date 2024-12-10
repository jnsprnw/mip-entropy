<script lang="ts">
	import Alice from '$icons/Alice.svelte';
	import Bob from '$icons/Bob.svelte';
	import { getGridState } from '$grid/grid-state.svelte';
	import { getObserverDetail } from '$grid/utils-order';
	import { OBSERVER_ALICE, OBSERVER_BOB } from '$config';
	const gridState = getGridState();
	import { fade } from 'svelte/transition';
	const { grid } = $derived(gridState);
	const { observer, is_visible_alice, is_visible_bob } = $derived(grid);
</script>

{#if is_visible_alice}
	<div
		in:fade
		out:fade
		class="hidden md:flex flex-col gap-y-1 col-start-[alice] row-start-1 w-[70px] lg:w-[120px] lg:p-3 text-center text-highlight"
		class:opacity-20={observer !== OBSERVER_ALICE}
	>
		<Alice />
		<span class="text-base/none mt-2 uppercase tracking-wider font-semibold">
			{getObserverDetail(OBSERVER_ALICE).label}
		</span>
		<span class="text-sm/none">
			{getObserverDetail(OBSERVER_ALICE).description}
		</span>
	</div>
{/if}

{#if is_visible_bob}
	<div
		in:fade
		out:fade
		class="hidden md:flex flex-col col-start-[bob] row-start-1 w-[70px] gap-y-1 lg:w-[120px] lg:p-3 text-center text-highlight-bob"
		class:opacity-20={observer !== OBSERVER_BOB}
	>
		<Bob />
		<span class="text-base/none mt-2 uppercase tracking-wider font-semibold">
			{getObserverDetail(OBSERVER_BOB).label}
		</span>
		<span class="text-sm/none">
			{getObserverDetail(OBSERVER_BOB).description}
		</span>
	</div>
{/if}
