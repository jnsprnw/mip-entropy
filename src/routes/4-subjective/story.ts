import type { Page } from '$types';

import { ID as id_order } from '$grid/grid-order.svelte';

export const pages: Page[] = [
	{
		text: 'Here we have a room full of objects with different shapes and colors. The task is to organize the room by putting similar objects on the same side.',
		type: id_order,
		actions: ['shuffle', 'setInvisibleAlice', 'removeObserver', 'stopLoop']
	},
	{
		text: 'First up is Alice, who has blurry vision and forgot her glasses. Alice can distinguish only the colors of the objects.',
		type: id_order,
		actions: ['setAlice', 'setVisibleAlice', 'setInvisibleBob']
	},
	{
		text: 'Now Bob enters the room. Bob is color-blind, so he can distinguish only the shapes of the objects. To Bob, this room still looks messy.',
		type: id_order,
		actions: ['setBob', 'setVisibleAlice', 'disallowObserverSwitch', 'setVisibleBob']
	},
	{
		text: 'This illustrates that entropy is a subjective measure. What different observers perceive as ordered depends on the information they have access to.',
		type: id_order,
		actions: ['setVisibleAlice', 'setVisibleBob', 'allowObserverSwitch']
	}
];
