<script lang="ts">
	interface Props {
		onclick: Function;
		label: string;
		disabled?: boolean;
		isActive?: boolean;
	}
	const { onclick, label, disabled = false, isActive = false }: Props = $props();
</script>

<button
	{disabled}
	class="bg-black text-white h-9 px-4 py-2 shadow-sm shadow-black/[0.04] hover:bg-black/80 inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
	class:bg-amber-800={isActive}
	{onclick}>{label}</button
>
