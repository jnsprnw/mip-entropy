<script lang="ts">
	import { getStoryState } from '$lib/components/story/story-state.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		prevPage: () => void;
		nextPage: () => void;
	}
	const { prevPage, nextPage }: Props = $props();

	const { is_first_page, is_last_page, current_page_number, total_pages } =
		$derived(getStoryState());
</script>

<menu class="bg-bg-dark flex items-center">
	<div
		class="w-full px-2 py-2 max-w-[920px] mx-auto grid grid-cols-3 justify-items-center items-center gap-x-4"
	>
		<Button isButtonPrevious={true} onclick={prevPage} disabled={is_first_page} label="Previous" />
		<span>{current_page_number} / {total_pages}</span>
		<Button isButtonNext={true} onclick={nextPage} disabled={is_last_page} label="Next" />
	</div>
</menu>
