<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Page } from '$types';
	import Grid from '$lib/components/grid/Grid.svelte';
	import Footer from './Footer.svelte';
	import { setStoryState } from '$lib/components/story/story-state.svelte';
	import { setGridState } from '$lib/components/grid/grid-state.svelte';
	import { onMount } from 'svelte';

	interface Props {
		title: string;
		children: Snippet;
		pages: Page[];
	}
	const { title, pages }: Props = $props();

	import { ID as id_order } from '$lib/components/grid/grid-order.svelte';
	import { ID as id_simple } from '$lib/components/grid/grid-simple.svelte';
	import { ID as id_move } from '$lib/components/grid/grid-move.svelte';

	const grid_type_ids = [id_order, id_simple, id_move];

	const story = setStoryState(pages);
	let grid = setGridState();

	function runActions() {
		console.log(`Running ${story.currentActions.length} actions`);
		const { grid: state } = grid;
		story.currentActions.forEach((action) => {
			if (typeof state[action] === 'function') {
				console.log('Running action:', action);
				state[action]();
			} else {
				console.warn('Action not found:', action);
			}
		});
	}

	function setGrid() {
		if (
			typeof story.currentType !== 'undefined' &&
			grid_type_ids.includes(story.currentType) &&
			grid.currentState !== story.currentType
		) {
			grid.currentState = story.currentType;
		}
	}

	onMount(() => {
		setGrid();
		runActions();
	});

	function nextPage() {
		story.nextPage();
		setGrid();
		runActions();
	}

	function prevPage() {
		story.prevPage();
		setGrid();
		runActions();
	}
</script>

<section class="grid grid-rows-[auto_1fr_auto] h-screen">
	<header class="p-5">
		<h2 class="text-accent-dark font-bold text-xl">{title}</h2>
	</header>
	<main class="p-5 flex items-center justify-center">
		<Grid />
	</main>
	<Footer {nextPage} {prevPage} />
</section>
