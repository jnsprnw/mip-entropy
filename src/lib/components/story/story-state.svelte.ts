import { PAGES } from './story';
import { setContext, getContext } from 'svelte';

export function createStory() {
	let page = $state<number>(0);
	const totalPages = PAGES.length;
	const maxPage = totalPages - 1;

	function nextPage() {
		if (page < maxPage) {
			page++;
		}
	}

	function prevPage() {
		if (page > 0) {
			page--;
		}
	}

	const currentPage = $derived(PAGES[page]);
	const { text: currentText } = $derived(currentPage);
	const { actions: currentActions = [] } = $derived(currentPage);
	const { type: currentType } = $derived(currentPage);

	return {
		nextPage,
		prevPage,
		get maxPage() {
			return maxPage;
		},
		get totalPages() {
			return totalPages;
		},
		get page() {
			return page;
		},
		get pageNumber() {
			return page + 1;
		},
		get currentText() {
			return currentText;
		},
		get currentActions() {
			return currentActions;
		},
		get currentType() {
			return currentType;
		}
	};
}

const STORY_KEY = Symbol('story');

export function setStoryState() {
	return setContext(STORY_KEY, createStory());
}

export function getStoryState() {
	return getContext<ReturnType<typeof setStoryState>>(STORY_KEY);
}
