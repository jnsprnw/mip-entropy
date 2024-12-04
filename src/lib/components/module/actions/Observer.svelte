<script lang="ts">
	import { getGridState } from '$grid/grid-state.svelte';
	import Button from '$ui/Button.svelte';
	import { getObserverDetail } from '$grid/utils-order';
	import { OBSERVER_ALICE } from '$config';
	import { fade } from 'svelte/transition';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { setObserver, allow_observer_switch, hasObserver, observer } = $derived(grid);
	const button_area = $derived(observer === OBSERVER_ALICE ? 'col-start-4' : 'col-start-1');

	const { other } = $derived(getObserverDetail(observer));
</script>

{#if hasObserver && allow_observer_switch}
	{#key observer}
		<div in:fade out:fade class="{button_area} col-span-2 row-start-2">
			<Button
				isPrimary={true}
				isButtonView={true}
				label="{other.label}’s view"
				onclick={() => setObserver(other.id)}
			/>
		</div>
	{/key}
{/if}
