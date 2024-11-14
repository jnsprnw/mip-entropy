<script lang="ts">
	interface Props {
		color: string;
	}
	const { color }: Props = $props();
</script>

<polygon
	points="-8,8 8,8 0,-8"
	stroke-linejoin="round"
	class="stroke-2 stroke-blue-900 fill transition-colors {color}"
/>
