<script lang="ts">
	import { isAlice } from '$lib/utils/utils';
	import { getGridState } from '$grid/grid-state.svelte';
	import Button from '$ui/Button.svelte';
	import { getObserverDetail } from '$grid/utils-order';
	import { fade } from 'svelte/transition';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { setObserver, allow_observer_switch, hasObserver, observer } = $derived(grid);
	const button_area = $derived(isAlice(observer) ? 'col-start-3 md:col-start-3' : 'col-start-1');

	const { other } = $derived(getObserverDetail(observer));
</script>

{#if hasObserver && allow_observer_switch}
	{#key observer}
		<div in:fade out:fade class="{button_area} justify-self-center col-span-1 row-start-2">
			<Button
				class="text-sm/none sm:text-sm/none md:text-sm/none"
				isPrimary={true}
				isButtonView={true}
				label="Change to {other.label}’s view"
				observer={other.id}
				onclick={() => setObserver(other.id)}
			/>
		</div>
	{/key}
{/if}
