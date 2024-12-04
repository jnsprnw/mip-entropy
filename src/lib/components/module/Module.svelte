<script lang="ts">
	import type { Page } from '$types';
	import Stage from './Stage.svelte';
	import Footer from './Footer.svelte';
	import { setStoryState } from '$lib/components/story/story-state.svelte';
	import { setGridState } from '$grid/grid-state.svelte';
	import { onMount } from 'svelte';
	import { checkGridTypeIDs } from '$lib/components/grid/grid-utils';

	interface Props {
		title: string;
		pages: Page[];
	}
	const { title, pages }: Props = $props();

	const story = setStoryState(pages);
	let grid = setGridState();

	function runActions() {
		const { grid: state } = grid;
		story.currentActions.forEach((action) => {
			if (typeof state[action] === 'function') {
				state[action]();
			} else {
				console.warn('Action not found:', action);
			}
		});
	}

	function setGrid() {
		if (
			typeof story.currentType !== 'undefined' &&
			checkGridTypeIDs(story.currentType) &&
			grid.currentState !== story.currentType
		) {
			grid.currentState = story.currentType;
		}
	}

	function doStep() {
		setGrid();
		runActions();
	}

	onMount(() => {
		doStep();
	});

	function nextPage() {
		story.nextPage();
		doStep();
	}

	function prevPage() {
		story.prevPage();
		doStep();
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<section class="grid grid-rows-[2fr_5fr_1fr] h-screen gap-y-2">
	<header class="sm:px-2 w-full sm:pt-2 flex flex-col gap-y-4 max-w-[920px] mx-auto">
		<h2 class="text-accent-dark font-bold text-xl md:text-3xl">{title}</h2>
		<p class="font-serif text-base md:text-xl">{story.currentText}</p>
	</header>
	<Stage />
	<Footer {nextPage} {prevPage} />
</section>
