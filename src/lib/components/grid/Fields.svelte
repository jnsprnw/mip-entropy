<script lang="ts">
	import { getContext } from 'svelte';
	import Field from './Field.svelte';

	const grid = getContext('Grid');
</script>

<g class="fields">
	{#each grid.fields as fill, i}
		<Field position={i} {fill} />
	{/each}
</g>
