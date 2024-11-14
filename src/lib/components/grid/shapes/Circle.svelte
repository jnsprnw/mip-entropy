<script lang="ts">
	interface Props {
		color: string;
	}
	const { color }: Props = $props();
</script>

<circle
	cx={0}
	cy={0}
	r="8"
	class="stroke-2 stroke-blue-900 fill transition-colors {color} blur-sm"
/>
