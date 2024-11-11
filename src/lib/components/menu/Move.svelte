<script lang="ts">
	import { getGridState } from '$lib/components/grid/grid-state.svelte';

	const state = getGridState();
	const { grid } = $derived(state);
</script>
