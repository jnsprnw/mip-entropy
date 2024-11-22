import type { Page } from '$types';

import { ID as id_simple } from '$lib/components/grid/grid-simple.svelte';

export const pages: Page[] = [
	{
		text: 'Entropy can also be thought of as a measure of uncertainty. Click on the squares to reveal where all nine particles are. Let’s start with the “ordered” state in which we know the particles are clumped together.',
		actions: ['guessLow'],
		type: id_simple
	},
	{
		text: 'In a more “disordered” state with more possible arrangements, finding one particle doesn’t tell you as much about where the rest of them will be located. Try finding all the particles in this high-entropy state.',
		actions: ['guessHigh'],
		type: id_simple
	}
];
