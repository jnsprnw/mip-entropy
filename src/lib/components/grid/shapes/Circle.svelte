<script lang="ts">
	interface Props {
		color: string;
		cx?: number;
		cy?: number;
		r: number;
		isBlur?: boolean;
	}
	const { color, cx = 0, cy = 0, r = 8, isBlur = false }: Props = $props();
</script>

<circle
	{cx}
	{cy}
	{r}
	class="fill transition-colors {color}"
	class:blur-xs={isBlur}
	class:md:blur-sm={isBlur}
/>
