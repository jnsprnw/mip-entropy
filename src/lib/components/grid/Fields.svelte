<script lang="ts">
	import { getSimpleState } from './grid-simple.svelte';
	import Field from './Field.svelte';

	const grid = getSimpleState();
</script>

<g class="fields">
	{#each grid.fields as fill, i}
		<Field position={i} {fill} />
	{/each}
</g>
