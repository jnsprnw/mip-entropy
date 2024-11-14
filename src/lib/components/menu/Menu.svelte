<script lang="ts">
	import Simple from '$lib/components/menu/Simple.svelte';
	import Order from '$lib/components/menu/Order.svelte';
	import Move from '$lib/components/menu/Move.svelte';
	import { ID as id_order } from '$lib/components/grid/grid-order.svelte';
	import { ID as id_simple } from '$lib/components/grid/grid-simple.svelte';
	import { ID as id_move } from '$lib/components/grid/grid-move.svelte';

	import { getGridState } from '$lib/components/grid/grid-state.svelte';

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
