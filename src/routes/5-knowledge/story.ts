import type { Page } from '$types';

import { ID as id_move } from '$grid/grid-move.svelte';

export const pages: Page[] = [
	{
		text: 'Earlier, we saw how it’s easier to harness work from a low-entropy state. If Alice and Bob can assign different values of entropy to the same system, what does that mean for their ability to do work?',
		type: id_move,
		actions: ['hideWall', 'resetWall', 'setParticles', 'showObserverSwitch', 'allowObserverSwitch']
	},
	{
		text: 'To Bob, the room is already in a maximum-entropy state, so there’s no way for him to extract energy.',
		type: id_move,
		actions: [
			'stopMoving',
			'showWall',
			'setBob',
			'showObserverSwitch',
			'disallowObserverSwitch',
			'startMoving',
			'resetSide',
			'setNoIgnoreColor'
		]
	},
	{
		text: 'But Alice sees the room as being in a low-entropy state. So, she can lift the weight by cleverly employing a divider that responds only to red particles.',
		type: id_move,
		actions: [
			'showWall',
			'setAlice',
			'setParticles',
			'showObserverSwitch',
			'disallowObserverSwitch',
			'selectLeftSide',
			'setRedIgnoreColor'
		]
	}
];
