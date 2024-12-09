<script lang="ts">
	import { getGridState } from '$grid/grid-state.svelte';
	import Button from '$ui/Button.svelte';
	const gridState = getGridState();
	import { fade } from 'svelte/transition';
	const { grid } = $derived(gridState);
	const { hasObserver, observer, sort, can_sort, entropy, is_sorting } = $derived(grid);
	import { getObserverDetail } from '$grid/utils-order';
	const verb = $derived(is_sorting ? 'Sorting' : entropy === 0 ? 'Sorted' : 'Sort');
	const { label } = $derived(getObserverDetail(observer));
</script>

{#if hasObserver}
	<div in:fade out:fade class="col-start-2 md:col-start-3 justify-self-center row-start-2">
		<Button
			isPrimary={true}
			disabled={!can_sort || is_sorting}
			label="{verb} for {label}"
			onclick={sort}
			isButtonSort={true}
			{observer}
		/>
	</div>
{/if}
