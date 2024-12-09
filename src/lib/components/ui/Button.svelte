<script lang="ts">
	import Right from '$icons/Right.svelte';
	import Left from '$icons/Left.svelte';
	import Sort from '$icons/Sort.svelte';
	import Eye from '$icons/Eye.svelte';
	import type { Observer } from '$types';
	import { OBSERVER_ALICE } from '$config';

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
		observer?: Observer;
		hidden?: boolean;
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
		class: classes = '',
		observer,
		hidden = false
	}: Props = $props();

	const colors = $derived.by(() => {
		if (!isPrimary) {
			return 'bg-white text-primary-light hover:bg-primary-light';
		}
		if (observer) {
			if (observer === OBSERVER_ALICE) {
				return 'bg-highlight text-white hover:bg-highlight';
			} else {
				return 'bg-highlight-bob text-white hover:bg-highlight-bob';
			}
		}
		return 'bg-primary-light text-white hover:bg-primary-dark';
	});
</script>

<button
	{disabled}
	aria-pressed={isActive}
	aria-hidden={hidden}
	class="{classes} {colors} gap-x-1 aria-hidden:opacity-0 md:gap-x-2 hover:text-white text-balance px-2 sm:px-6 md:px-8 py-1 sm:py-2 shadow-sm shadow-black/[0.04] inline-grid items-center justify-center rounded-lg md:text-base/none tracking-wider font-medium ring-offset-background transition-[colors_opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 disabled:pointer-events-none"
	{onclick}
	class:grid-cols-[auto_24px]={isButtonNext || isButtonSort || isButtonView}
	class:grid-cols-[24px_auto]={isButtonPrevious}
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
