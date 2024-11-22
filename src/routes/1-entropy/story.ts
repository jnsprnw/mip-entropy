import type { Page } from '$types';

import { ID as id_simple } from '$lib/components/grid/grid-simple.svelte';

export const pages: Page[] = [
	{
		text: 'Entropy is a measure of disorder. It corresponds with how many possible configurations are compatible with a particular state. Take the case in which the nine particles in this box must be clumped together as one big square. There are only 16 ways for this state to exist.',
		actions: ['loopLow'],
		type: id_simple
	},
	{
		text: 'Now, consider the state in which the particles can occupy all the squares in the box. There are 27,540,584,512 different ways they can be arranged.',
		actions: ['loopHigh'],
		type: id_simple
	},
	{
		text: 'It’s much more probable for the particles to be spread throughout the box than it is for them to be clumped together. This is the basic idea behind the Second Law of Thermodynamics, the statement that entropy never decreases in a closed system.',
		actions: ['toggleLowHigh'],
		type: id_simple
	}
];
