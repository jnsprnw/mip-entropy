import type { Page } from '$types';

import { ID as id_simple } from '$grid/grid-simple.svelte';

export const pages: Page[] = [
	{
		text: 'Let’s start with an ordered state in which you know all nine particles are clumped together. Click on the squares to reveal where the particles are.',
		actions: ['setEntropyLow', 'guessLow'],
		type: id_simple
	},
	{
		text: 'In a more disordered state with any possible arrangement, finding one particle doesn’t tell you anything about where the rest will be. Click on the squares to find the particles in this high-entropy state.',
		actions: ['setEntropyHigh', 'guessHigh'],
		type: id_simple
	}
];
