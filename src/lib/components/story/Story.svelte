<script lang="ts">
	import { setStoryState } from './story-state.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Grid from '$lib/components/grid/Grid.svelte';
	import { setSimpleState } from '$lib/components/grid/grid-simple.svelte';
	import Simple from '../sections/Simple.svelte';
	import { onMount } from 'svelte';

	const story = setStoryState();
	const grid = setSimpleState();

	onMount(() => {
		story.currentActions.forEach((action) => {
			if (typeof grid[action] === 'function') {
				grid[action]();
			}
		});
	});

	function nextPage() {
		story.nextPage();
		console.log(story.currentActions);
		story.currentActions.forEach((action) => {
			if (typeof grid[action] === 'function') {
				grid[action]();
			}
		});
	}

	function prevPage() {
		story.prevPage();
		console.log(story.currentActions);
		story.currentActions.forEach((action) => {
			if (typeof grid[action] === 'function') {
				grid[action]();
			}
		});
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
