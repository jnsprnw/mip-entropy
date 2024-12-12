import type { Page } from '$types';

import { ID as id_simple } from '$grid/grid-simple.svelte';

export const pages: Page[] = [
	{
		text: 'Take the case in which the nine particles in this box must clump together in one big square. There are only <strong>16</strong> ways for this state to exist.',
		actions: ['loopLow'],
		type: id_simple
	},
	{
		text: 'Now consider the state in which the particles can occupy any of the squares in the box. There are <strong>94,143,280</strong> possible arrangements.',
		actions: ['loopHigh'],
		type: id_simple
	},
	{
		text: 'Because there are so many more ways for particles to be spread out, particles are overwhelmingly likely to move into the spread-out states. This is the idea behind the second law of thermodynamics, which says the entropy of a closed system always increases.',
		actions: ['toggleLowHigh'],
		type: id_simple
	}
];
