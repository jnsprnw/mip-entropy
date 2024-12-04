<script lang="ts">
	import { getGridState } from '$grid/grid-state.svelte';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	import Button from '$lib/components/ui/Button.svelte';
</script>

{#if !grid.has_weight && grid.can_select}
	<div
		class="grid grid-cols-2 justify-items-center content-center h-full font-semibold text-accent-dark text-sm/none p-2 gap-x-4"
	>
		<Button onclick={() => grid.selectSide('left')} label="Hang weight on left" />
		<Button onclick={() => grid.selectSide('right')} label="Hang weight on right" />
	</div>
{/if}
