<script lang="ts">
	interface Props {
		color: string;
		x?: number;
		y?: number;
	}
	const { color, x = 0, y = 0 }: Props = $props();
</script>

<rect
	x={x - 8}
	y={y - 8}
	width="16"
	height="16"
	stroke-linejoin="round"
	class="stroke-2 stroke-blue-900 fill transition-colors {color}"
/>
