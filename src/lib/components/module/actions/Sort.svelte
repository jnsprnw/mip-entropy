<script lang="ts">
	import { getGridState } from '$grid/grid-state.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	const gridState = getGridState();
	import { fade } from 'svelte/transition';
	const { grid } = $derived(gridState);
	const { hasObserver, observer, sort, can_sort, entropy, is_sorting } = $derived(grid);
	import { getObserverDetail } from '$lib/components/grid/utils-order';
	const verb = $derived(is_sorting ? 'Sorting' : entropy === 0 ? 'Sorted' : 'Sort');
	const { label } = $derived(getObserverDetail(observer));
</script>

{#if hasObserver}
	<div in:fade out:fade class="col-start-1 col-span-5 row-start-2">
		<Button
			isPrimary={true}
			disabled={!can_sort}
			label="{verb} for {label}"
			onclick={sort}
			isButtonSort={true}
		/>
	</div>
{/if}
