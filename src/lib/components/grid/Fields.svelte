<script lang="ts">
	import { getGridState } from './grid-state.svelte';
	import Field from './Field.svelte';

	const gridState = getGridState();
	const { grid } = $derived(gridState);
</script>

<g class="fields">
	{#each grid.fields as opt, i}
		<Field position={opt?.index ?? i} {opt} />
	{/each}
</g>
