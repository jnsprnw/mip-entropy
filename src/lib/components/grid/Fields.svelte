<script lang="ts">
	import { getGridState } from '$grid/grid-state.svelte';
	import Field from './Field.svelte';

	const gridState = getGridState();
	const { grid } = $derived(gridState);
</script>

<filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
	<feGaussianBlur in="SourceGraphic" stdDeviation="3" />
</filter>

<g class="fields">
	{#each grid.fields as opt, i}
		<Field position={opt?.index ?? i} {opt} />
	{/each}
</g>
