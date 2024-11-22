<script lang="ts">
	import Alice from '$lib/icons/Alice.svelte';
	import Bob from '$lib/icons/Bob.svelte';
	import { fade } from 'svelte/transition';
	import { getGridState } from '$lib/components/grid/grid-state.svelte';
	import { OBSERVER_ALICE } from '$config';
	import Gauge from '$lib/components/gauge/Gauge.svelte';
	const gridState = getGridState();
	const { grid } = $derived(gridState);
	const { entropy_value } = $derived(grid);
</script>

<div class="col-start-2 row-start-1 p-5">
	<Gauge value={entropy_value} />
</div>
