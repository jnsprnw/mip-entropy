<script lang="ts">
	import Right from '$lib/icons/Right.svelte';
	import Left from '$lib/icons/Left.svelte';
	import Sort from '$lib/icons/Sort.svelte';
	import Eye from '$lib/icons/Eye.svelte';

	interface Props {
		onclick: () => void;
		label: string;
		disabled?: boolean;
		isActive?: boolean;
		isButtonNext?: boolean;
		isButtonPrevious?: boolean;
		isButtonSort?: boolean;
		isButtonView?: boolean;
	}
	const {
		onclick,
		label,
		disabled = false,
		isActive = false,
		isButtonNext = false,
		isButtonPrevious = false,
		isButtonSort = false,
		isButtonView = false
	}: Props = $props();
</script>

<button
	{disabled}
	aria-pressed={isActive}
	class="gap-x-2 text-white disabled:cursor-not-allowed h-9 px-6 py-2 shadow-sm shadow-black/[0.04] hover:bg-button-primary inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 disabled:pointer-events-none"
	class:bg-amber-800={isActive}
	class:bg-button-secondary={!isActive}
	class:disabled:bg-button-mute={!isActive}
	class:disabled:bg-amber-700={isActive}
	{onclick}
>
	{#if isButtonPrevious}
		<Left />
	{/if}
	{label}
	{#if isButtonNext}
		<Right />
	{:else if isButtonSort}
		<Sort />
	{:else if isButtonView}
		<Eye />
	{/if}
</button>
