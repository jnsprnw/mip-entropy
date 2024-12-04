import { ID as id_simple } from '$grid/grid-simple.svelte';
import { ID as id_order } from '$grid/grid-order.svelte';
import { ID as id_move } from '$grid/grid-move.svelte';
import {
	KEY_SORT_COLOR,
	KEY_SORT_FIGURE,
	OBSERVER_ALICE,
	OBSERVER_BOB,
	ENTITY_COLOR_A,
	ENTITY_COLOR_B,
	ENTROPY_LOW,
	ENTROPY_HIGH
} from '$config';

export type GridType = typeof id_simple | typeof id_order | typeof id_move;

export type Page = {
	text: string;
	actions?: string[];
	type?: GridType;
};

export type Observer = typeof OBSERVER_ALICE | typeof OBSERVER_BOB | undefined;
export type EntityColor = typeof ENTITY_COLOR_A | typeof ENTITY_COLOR_B | undefined;

export type SimpleField = { fill: boolean | undefined } | undefined;

export type RichField = { index?: number; [KEY_SORT_COLOR]: string; [KEY_SORT_FIGURE]: string };

export type SortByKey = typeof KEY_SORT_FIGURE | typeof KEY_SORT_COLOR;

export type EntropyLevel = typeof ENTROPY_LOW | typeof ENTROPY_HIGH | number;

export type Padding = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

export type Particle = {
	// Koordinaten des Balls
	cx: number;
	cy: number;
	// Winkel der Bewegung
	angle: number;
	// Beweungsrichtung
	dx: number;
	dy: number;
	radius: number;
	color: string | undefined;
	shape: string;
};
