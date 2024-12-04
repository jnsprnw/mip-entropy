<script lang="ts">
	import { getGridState } from '$grid/grid-state.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const state = getGridState();
	const { grid } = $derived(state);
</script>

{#if grid.show_observer_switch}
	<Button
		disabled={grid.observer === 'alice' || !grid.allow_observer_switch}
		onclick={() => grid.setObserver('alice')}
		isActive={grid.observer === 'alice'}
		label="Set observer to Alice"
	/>
	<Button
		disabled={grid.observer === 'bob' || !grid.allow_observer_switch}
		onclick={() => grid.setObserver('bob')}
		isActive={grid.observer === 'bob'}
		label="Set observer to Bob"
	/>
{/if}
