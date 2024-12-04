<script lang="ts">
	import { setStoryState } from './story-state.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Grid from '$grid/Grid.svelte';
	import { setGridState } from '$grid/grid-state.svelte';
	import { onMount } from 'svelte';
	import Menu from '$lib/components/menu/Menu.svelte';

	import { ID as id_order } from '$grid/grid-order.svelte';
	import { ID as id_simple } from '$grid/grid-simple.svelte';
	import { ID as id_move } from '$grid/grid-move.svelte';

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
		if ([id_order, id_simple, id_move].includes(story.currentType)) {
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

<div class="grid grid-rows-[3fr_1fr_2fr_auto] gap-y-4 min-h-screen p-12">
	<div class="flex items-center justify-center">
		<Grid />
	</div>
	<div class="flex items-center justify-center">
		<Menu />
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
