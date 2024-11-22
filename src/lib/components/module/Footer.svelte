<script lang="ts">
	import { getStoryState } from '$lib/components/story/story-state.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const story = getStoryState();

	interface Props {
		prevPage: () => void;
		nextPage: () => void;
	}
	const { prevPage, nextPage }: Props = $props();
</script>

<menu class="bg-bg-dark px-2 py-2 grid grid-cols-3 justify-items-center items-center gap-x-4">
	<Button isButtonPrevious={true} onclick={prevPage} disabled={story.page === 0} label="Previous" />
	<span>{story.pageNumber} / {story.totalPages}</span>
	<Button
		isButtonNext={true}
		onclick={nextPage}
		disabled={story.page === story.maxPage}
		label="Next"
	/>
</menu>
