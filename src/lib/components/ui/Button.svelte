<script lang="ts">
	import Right from '$icons/Right.svelte';
	import Left from '$icons/Left.svelte';
	import Sort from '$icons/Sort.svelte';
	import Eye from '$icons/Eye.svelte';

	interface Props {
		onclick: () => void;
		label: string;
		disabled?: boolean;
		isActive?: boolean;
		isButtonNext?: boolean;
		isButtonPrevious?: boolean;
		isButtonSort?: boolean;
		isButtonView?: boolean;
		isPrimary?: boolean;
		class?: string;
	}
	const {
		onclick,
		label,
		disabled = false,
		isActive = false,
		isButtonNext = false,
		isButtonPrevious = false,
		isButtonSort = false,
		isButtonView = false,
		isPrimary = false,
		class: classes = ''
	}: Props = $props();
</script>

<button
	{disabled}
	aria-pressed={isActive}
	class="{classes} gap-x-1 md:gap-x-2 disabled:opacity-0 hover:text-white text-balance px-2 sm:px-6 md:px-8 py-1 sm:py-2 shadow-sm shadow-black/[0.04] inline-flex items-center justify-center rounded-lg text-xs/none md:text-sm/none font-medium ring-offset-background transition-[colors_opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 disabled:pointer-events-none"
	class:bg-amber-800={isActive}
	class:bg-primary-light={isPrimary}
	class:bg-white={!isPrimary}
	class:text-white={isPrimary}
	class:text-primary-light={!isPrimary}
	class:hover:bg-primary-dark={isPrimary}
	class:hover:bg-primary-light={!isPrimary}
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
