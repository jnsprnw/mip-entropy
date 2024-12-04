<script lang="ts">
	import Simple from '$menu/Simple.svelte';
	import Order from '$menu/Order.svelte';
	import Move from '$menu/Move.svelte';
	import { ID as id_order } from '$grid/grid-order.svelte';
	import { ID as id_simple } from '$grid/grid-simple.svelte';
	import { ID as id_move } from '$grid/grid-move.svelte';

	import { getGridState } from '$grid/grid-state.svelte';

	const grid = getGridState();
	const { currentState } = $derived(grid);
</script>

<menu>
	{#if currentState === id_order}
		<Order />
	{:else if currentState === id_simple}
		<Simple />
	{:else if currentState === id_move}
		<Move />
	{/if}
</menu>
