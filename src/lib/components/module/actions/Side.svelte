<script lang="ts">
	import { getGridState } from '$grid/grid-state.svelte';
	import Button from '$ui/Button.svelte';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { selected_side, resetSide, can_select } = $derived(grid);
</script>

{#if typeof selected_side !== 'undefined' && can_select}
	<div class="col-start-[left] col-end-[right] row-start-2 text-center items-center gap-x-4">
		<Button label="Reset selection" isWide={true} disabled={!selected_side} onclick={resetSide} />
	</div>
{/if}
