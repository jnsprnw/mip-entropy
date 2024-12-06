import type { Padding } from '$types';

export const MODE_GUESS = 'guess';
export const MODE_LOOP = 'loop';

export const WEIGHT_WIDTH = 62;
export const WEIGHT_HEIGHT = 25;

export const PADDING_GRID_WITH_WEIGHT: Padding = {
	bottom: 10,
	left: WEIGHT_WIDTH,
	top: WEIGHT_HEIGHT,
	right: WEIGHT_WIDTH
};

export const PADDING_GRID: Padding = {
	bottom: 10,
	left: 10,
	top: 10,
	right: 10
};

export const MODE_SIMPLE = 'simple';
export const MODE_MOVE = 'move';
export const MODE_ORDER = 'order';

export const OBSERVER_ALICE = 'alice';
export const OBSERVER_BOB = 'bob';

export const ENTITY_COLOR_A = 'color_a';
export const ENTITY_COLOR_B = 'color_b';

export const ENTITY_SHAPE_CIRCLE = 'circle';
export const ENTITY_SHAPE_SQUARE = 'square';
export const ENTITY_SHAPE_TRIANGLE = 'triangle';

export const KEY_SORT_COLOR = 'color';
export const KEY_SORT_FIGURE = 'figure';

export const ENTROPY_HIGH = 'high';
export const ENTROPY_LOW = 'low';

export const GRID_SIZE = 6;

export const WALL_WIDTH = 8;

export const SIDE_LEFT = 'left';
export const SIDE_RIGHT = 'right';
