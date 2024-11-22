<script lang="ts">
	import { getGridState } from '$lib/components/grid/grid-state.svelte';
	import Gauge from '$lib/components/gauge/Gauge.svelte';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { entropy_value } = $derived(grid);
</script>

<div class="col-start-2 row-start-1 p-5 w-full h-full">
	<Gauge value={entropy_value} />
</div>
