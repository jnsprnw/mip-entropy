<script lang="ts">
	interface Props {
		color: string;
	}
	const { color }: Props = $props();
</script>

<rect
	x={-8}
	y={-8}
	width="16"
	height="16"
	stroke-linejoin="round"
	class="stroke-2 stroke-blue-900 fill transition-colors {color}"
/>
