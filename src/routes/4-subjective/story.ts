import type { Page } from '$types';

import { ID as id_order } from '$lib/components/grid/grid-order.svelte';

export const pages: Page[] = [
	{
		text: 'However, the concept of “order” can differ between observers. Here we have a room full of particles with different shapes and colors. The task is to organize the room by putting similar objects on the same side.',
		type: id_order,
		actions: ['setVisibleAlice', 'setVisibleBob', 'removeObserver', 'stopLoop']
	},
	{
		text: 'First up is Alice, who has blurry vision and forgot her glasses. Alice can distinguish only the colors of the particles.',
		type: id_order,
		actions: ['setAlice']
	},
	{
		text: 'Now Bob enters the room. Bob is color-blind, so he can distinguish only the shapes of the particles. To Bob, this room still looks messy.',
		type: id_order,
		actions: ['setBob', 'disallowObserverSwitch']
	},
	{
		text: 'This illustrates that entropy is a subjective measure. What different observers perceive as “ordered” depends on the information they have access to.',
		type: id_order,
		actions: ['allowObserverSwitch']
	}
];
