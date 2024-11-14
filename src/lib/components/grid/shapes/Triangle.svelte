<script lang="ts">
	interface Props {
		color: string;
		x?: number;
		y?: number;
	}
	const { color, x = 0, y = 0 }: Props = $props();
</script>

<polygon
	points="{x - 8},{y + 8} {x + 8},{y + 8} {x + 0},{y - 8}"
	stroke-linejoin="round"
	class="stroke-2 stroke-blue-900 fill transition-colors {color}"
/>
