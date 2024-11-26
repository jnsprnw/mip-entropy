import { ENTROPY_LOW, ENTROPY_HIGH } from '$config';
import type { EntropyLevel } from '$types';

export function getEntropyValue(level: EntropyLevel): number {
	switch (level) {
		case ENTROPY_LOW:
			return 0;
		case ENTROPY_HIGH:
			return 100;
		default:
			return level;
	}
}
