<script lang="ts">
	interface Props {
		color: string;
		x?: number;
		y?: number;
		size?: number;
	}
	const { color, x = 0, y = 0, size = 8 }: Props = $props();

	const SQRT_3 = Math.sqrt(3);
	const a = $derived((2 * size) / SQRT_3);
</script>

<polygon
	points="{x - a / 2},{y + size / 2} {x + a / 2},{y + size / 2} {x},{y - size / 2}"
	stroke-linejoin="round"
	class="fill transition-colors {color}"
/>
