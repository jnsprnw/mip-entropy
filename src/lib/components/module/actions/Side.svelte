<script lang="ts">
	import { getGridState } from '$grid/grid-state.svelte';
	import Button from '$ui/Button.svelte';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { selected_side, canGuess, resetSide, can_select, is_wall_ended } = $derived(grid);
</script>

{#if typeof selected_side !== 'undefined' && can_select}
	<div
		class="col-start-[left] col-end-[right] row-start-2 grid grid-cols-2 text-center items-center gap-x-4"
	>
		<div class="flex flex-col transition-opacity" class:opacity-50={!canGuess}>
			{#if is_wall_ended}
				<span class="text-xs">Good job!</span>
			{/if}
		</div>
		<Button label="Reset selection" disabled={!selected_side} onclick={resetSide} />
	</div>
{/if}
