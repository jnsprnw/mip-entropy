import type { Particle } from '$types';

export function intersectsWall(
	x: number,
	y: number,
	dx: number,
	dy: number,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	radius: number
) {
	// Berechnen der nächsten Position des Balls
	const nextX = x + dx;
	const nextY = y + dy;

	// Berechnen der Distanz von der Linie (Mauer) zur nächsten Position des Balls
	const dist =
		Math.abs((y2 - y1) * nextX - (x2 - x1) * nextY + x2 * y1 - y2 * x1) /
		Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);

	// Berechnen des Normalenvektors der Wand
	const wallNormalX = y2 - y1;
	const wallNormalY = x1 - x2;

	// Berechnen des Skalarprodukts des Bewegungsvektors des Balls mit dem Normalenvektor der Wand
	const dotProduct = dx * wallNormalX + dy * wallNormalY;

	// Bestimmen, ob der Ball von der linken oder rechten Seite kommt
	const comingFrom = dotProduct > 0 ? 'right' : 'left';

	return {
		intersects: dist <= radius,
		comingFrom: comingFrom
	};
}

export function getWallNormal(x1: number, y1: number, x2: number, y2: number) {
	const dx = x2 - x1;
	const dy = y2 - y1;
	const length = Math.sqrt(dx * dx + dy * dy);
	return { x: -dy / length, y: dx / length };
}

export function checkIfWallHitRight(
	particle: Particle,
	radius: number,
	wall_x: number,
	wall_width: number,
	ignore_color: string | undefined
) {
	return particle.color !== ignore_color && particle.cx - radius <= wall_x && particle.cx > wall_x;
}

export function checkIfWallHitLeft(
	particle: Particle,
	radius: number,
	wall_x: number,
	wall_width: number,
	ignore_color: string | undefined
) {
	return particle.color !== ignore_color && particle.cx + radius >= wall_x && particle.cx < wall_x;
}
