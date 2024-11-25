<script lang="ts">
	import { getGridState } from '$lib/components/grid/grid-state.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { getObserverDetail } from '$lib/components/grid/utils-order';
	import { OBSERVER_ALICE } from '$config';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { setObserver, allow_observer_switch, hasObserver, observer } = $derived(grid);

	const button_area = $derived(observer === OBSERVER_ALICE ? 'col-start-1' : 'col-start-4');

	const { label, other } = $derived(getObserverDetail(observer));
</script>

{#if hasObserver && allow_observer_switch}
	<div class="{button_area} col-span-2 row-start-2">
		<Button isButtonView={true} label="{label}’s view" onclick={() => setObserver(other)} />
	</div>
{/if}
