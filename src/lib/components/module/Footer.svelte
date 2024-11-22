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
	<Button
		isButtonPrevious={true}
		onclick={prevPage}
		disabled={story.is_first_page}
		label="Previous"
	/>
	<span>{story.current_page_number} / {story.total_pages}</span>
	<Button isButtonNext={true} onclick={nextPage} disabled={story.is_last_page} label="Next" />
</menu>
