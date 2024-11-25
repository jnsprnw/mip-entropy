<script lang="ts">
	interface Props {
		color: string;
		x?: number;
		y?: number;
		size?: number;
	}
	const { color, x = 0, y = 0, size = 8 }: Props = $props();

	const a = $derived(size / 2);
</script>

<rect
	x={x - a}
	y={y - a}
	width={a * 2}
	height={a * 2}
	stroke-linejoin="round"
	class="fill transition-colors {color}"
/>
