<script lang="ts">
	import { getStoryState } from '$story/story-state.svelte';
	import Button from '$ui/Button.svelte';

	interface Props {
		prevPage: () => void;
		nextPage: () => void;
	}
	const { prevPage, nextPage }: Props = $props();

	const { is_first_page, is_last_page, current_page_number, total_pages } =
		$derived(getStoryState());
</script>

<menu class=" flex items-center">
	<div
		class="border-t h-full border-t-white w-full sm:px-2 py-2 max-w-[920px] mx-auto grid grid-cols-3 justify-items-center items-center gap-x-4"
	>
		<Button
			isButtonPrevious={true}
			isPrimary={true}
			onclick={prevPage}
			hidden={is_first_page}
			label="Previous"
			class="justify-self-start"
		/>
		<span class="tabular-nums text-sm text-primary-dark">
			{current_page_number} / {total_pages}
		</span>
		<Button
			isButtonNext={true}
			isPrimary={true}
			onclick={nextPage}
			hidden={is_last_page}
			label="Next"
			class="justify-self-end"
		/>
	</div>
</menu>
