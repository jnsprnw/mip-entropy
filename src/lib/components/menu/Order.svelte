<script lang="ts">
	import { getGridState } from '$grid/grid-state.svelte';
	import Button from '$ui/Button.svelte';

	const state = getGridState();
	const { grid } = $derived(state);

	const label = $derived(grid.is_sorting ? 'Sorting …' : grid.entropy === 0 ? 'Sorted' : 'Sort');
</script>

{#if typeof grid.observer !== 'undefined' && !grid.allow_observer_switch}
	<Button
		onclick={() => (grid.is_sorting ? grid.stopLoop() : grid.sort())}
		disabled={!grid.can_sort}
		{label}
	/>
{/if}
{#if grid.allow_observer_switch}
	<Button
		disabled={grid.observer === 'alice'}
		onclick={() => grid.setObserver('alice')}
		isActive={grid.observer === 'alice'}
		label="Set observer to Alice"
	/>
	<Button
		disabled={grid.observer === 'bob'}
		onclick={() => grid.setObserver('bob')}
		isActive={grid.observer === 'bob'}
		label="Set observer to Bob"
	/>
{/if}
