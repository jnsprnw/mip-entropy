import type { Page, GridType } from '$types';
import { setContext, getContext } from 'svelte';

export class StoryState {
	pages = $state<Page[]>([]);
	current_page_index = $state<number>(0);
	current_page_number = $derived<number>(this.current_page_index + 1);

	constructor(module_pages: Page[]) {
		this.pages = module_pages;
	}

	totalPages = $derived(this.pages.length);
	maxPage = $derived(this.totalPages - 1);
	currentPage = $derived<Page>(this.pages[this.current_page_index]);
	currentText = $derived<string>(this.currentPage.text);
	currentActions = $derived<string[]>(this.currentPage.actions ?? []);
	currentType = $derived<GridType | undefined>(this.currentPage.type);

	nextPage() {
		if (this.current_page_index < this.maxPage) {
			this.current_page_index++;
		}
	}

	prevPage() {
		if (this.current_page_index > 0) {
			this.current_page_index--;
		}
	}
}

const STORY_KEY = Symbol('story');

export function setStoryState(module_pages: Page[]) {
	return setContext(STORY_KEY, new StoryState(module_pages));
}

export function getStoryState() {
	return getContext<ReturnType<typeof setStoryState>>(STORY_KEY);
}
