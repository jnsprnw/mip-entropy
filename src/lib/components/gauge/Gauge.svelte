<script lang="ts">
	interface Props {
		value: number;
	}
	const { value }: Props = $props();
</script>

<span>{value}</span>
