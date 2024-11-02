<script lang="ts">
	import { setStoryState } from './story-state.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Grid from '$lib/components/grid/Grid.svelte';
	import { setGridState } from '$lib/components/grid/grid-state.svelte';
	import { onMount } from 'svelte';

	const story = setStoryState();
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
		console.log('Setting grid');
		if (typeof story.currentType === 'symbol') {
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

<div class="grid grid-rows-[2fr_1fr_auto] gap-y-4 min-h-screen p-12">
	<div class="flex items-center justify-center">
		<Grid />
	</div>
	<div class="flex justify-center">
		<p class="max-w-prose text-lg">{story.currentText}</p>
	</div>
	<menu class="flex justify-center items-center gap-x-12">
		<Button onclick={prevPage} disabled={story.page === 0} label="Previous" />
		<span>{story.pageNumber} / {story.totalPages}</span>
		<Button onclick={nextPage} disabled={story.page === story.maxPage} label="Next" />
	</menu>
</div>
