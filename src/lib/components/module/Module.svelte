<script lang="ts">
	import type { Page } from '$types';
	import Stage from './Stage.svelte';
	import Footer from './Footer.svelte';
	import { setStoryState } from '$story/story-state.svelte';
	import { setGridState } from '$grid/grid-state.svelte';
	import { onMount } from 'svelte';
	import { checkGridTypeIDs } from '$grid/grid-utils';

	interface Props {
		title: string;
		intro: string;
		pages: Page[];
	}
	const { title, pages, intro }: Props = $props();

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

<section class="grid grid-rows-[124px_1fr_5fr_1fr] max-w-full w-screen h-screen gap-y-2">
	<div class="bg-bg-dark flex items-center justify-center px-2 lg:px-0">
		<header class="w-full flex flex-col gap-y-3 max-w-[920px] text-center">
			<h2 class="text-primary-dark font-bold text-xl/tight md:text-2xl/none">{title}</h2>
			<p class="text-primary-mute font-serif text-base md:text-lg text-balance">
				{intro}
			</p>
		</header>
	</div>
	<div class="flex items-center justify-center px-2 lg:px-0">
		<p class="font-sans text-text md:text-lg max-w-[920px] text-center text-balance">
			{@html story.currentText}
		</p>
	</div>
	<Stage />
	<Footer {nextPage} {prevPage} />
</section>
