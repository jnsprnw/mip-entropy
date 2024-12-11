<script lang="ts">
	import { getGridState } from '$grid/grid-state.svelte';
	import Button from '$ui/Button.svelte';
	const gridState = getGridState();
	import { fade } from 'svelte/transition';
	const { grid } = $derived(gridState);
	const { hasObserver, observer, sort, can_sort, is_sorting, is_sorted } = $derived(grid);
	import { getObserverDetail } from '$grid/utils-order';
	const verb = $derived(is_sorting ? 'Sorting' : is_sorted ? 'Sorted' : 'Sort');
	const { label } = $derived(getObserverDetail(observer));
</script>

{#if hasObserver}
	<div in:fade out:fade class="col-start-2 md:col-start-2 justify-self-center row-start-2">
		<Button
			isPrimary={true}
			disabled={!can_sort || is_sorting}
			label="{verb} for {label}"
			onclick={sort}
			isButtonSort={true}
			isActive={is_sorting || is_sorted}
			{observer}
		/>
	</div>
{/if}
