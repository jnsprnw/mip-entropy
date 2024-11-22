<script lang="ts">
	import { getStoryState } from '$lib/components/story/story-state.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const story = getStoryState();

	interface Props {
		prevPage: Function;
		nextPage: Function;
	}
	const { prevPage, nextPage }: Props = $props();
</script>

<footer class="bg-bg-dark p-5">
	<menu class="grid grid-cols-3 justify-items-center items-center gap-x-4">
		<Button onclick={prevPage} disabled={story.page === 0} label="Previous" />
		<span>{story.pageNumber} / {story.totalPages}</span>
		<Button onclick={nextPage} disabled={story.page === story.maxPage} label="Next" />
	</menu>
</footer>
