<script lang="ts">
	import { getGridState } from '$grid/grid-state.svelte';
	import Button from '$ui/Button.svelte';
	import { fade } from 'svelte/transition';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { has_weight, can_select, selectSide, is_wall_ended } = $derived(grid);

	const can_hang = $derived<boolean>(!has_weight && can_select);
</script>

<div
	in:fade
	out:fade
	class="col-start-[moveA] row-start-1 justify-self-end place-content-center h-full"
>
	{#if can_hang}
		<Button
			class="max-w-[150px]"
			isAction={true}
			onclick={() => selectSide('left')}
			label="Hang weight on left"
		/>
	{:else if typeof is_wall_ended === 'boolean' && is_wall_ended}
		<span class="text-base/tight block md:text-xl/tight text-center font-semibold text-[#00B200]">
			Good job!
		</span>
	{/if}
</div>

<div
	in:fade
	out:fade
	class="col-start-[moveB] row-start-1 justify-self-start place-content-center h-full"
>
	{#if can_hang}
		<Button
			class="max-w-[150px]"
			isAction={true}
			onclick={() => selectSide('right')}
			label="Hang weight on right"
		/>
	{:else if typeof is_wall_ended === 'boolean' && !is_wall_ended}
		<span class="block text-base/tight md:text-xl/tight text-center font-semibold text-[#DD5041]">
			Try again.
		</span>
	{/if}
</div>
