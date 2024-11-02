<script lang="ts">
	import { getGridState } from './grid-state.svelte';
	import Field from './Field.svelte';

	const gridState = getGridState();
	const { grid } = $derived(gridState);
</script>

<g class="fields">
	{#each grid.fields as fill, i}
		<Field position={i} {fill} />
	{/each}
</g>
