import { PADDING_GRID, LAYOUT_LINEAR } from '$config';

export const ID = Symbol('move');

export function createMove(size: number = 6) {
	let mode = $state<'vertical' | 'diagonal'>('vertical');
	let is_moving = $state<boolean>(false);

	// Koordinaten des Balls
	let cx = $state<number>(0);
	let cy = $state<number>(0);

	// Radius des Balls
	const radius = 0.05;

	// Bewegungsgeschwindigkeit
	const speed = 0.03;

	// Winkel der Bewegung
	let angle = $state<number>(0);

	// Beweungsrichtung
	let dx = $state<number>(0);
	let dy = $state<number>(0);

	// Koordinaten der Wand
	let wall_x1 = $state<number>(0);
	let wall_x2 = $state<number>(0);

	const wall_y1 = 0;
	const wall_y2 = 1;

	let wall_highlight = $state<boolean>(false);
	let has_shadow = $state<boolean>(false);

	const is_ball_left = $derived.by(() => {
		const wallDirX = wall_x2 - wall_x1;
		const wallDirY = wall_y2 - wall_y1;

		// Vektor vom Startpunkt der Wand zum Ball
		const ballVecX = cx - wall_x1;
		const ballVecY = cy - wall_y1;

		// Berechne das Kreuzprodukt
		const crossProduct = wallDirX * ballVecY - wallDirY * ballVecX;

		// Wenn das Kreuzprodukt positiv ist, befindet sich der Ball rechts von der Wand
		return crossProduct > 0;
	});

	const pulley_radius = 10;
	const pulley_off_x = PADDING_GRID.left / 2;
	const pulley_off_y = PADDING_GRID.top / 2;

	function move() {
		cx += dx;
		cy += dy;

		if (mode === 'vertical') {
			// The wall is vertical

			// The wall was hit on the right hand side
			const wall_hit_right = cx - radius <= wall_x1 && cx > wall_x1;
			// The wall was hit on the right hand side
			const wall_hit_left = cx + radius >= wall_x1 && cx < wall_x1;

			// The wall or outer bounds are hit
			if (cx - radius < 0 || wall_hit_right || wall_hit_left || cx + radius > 1) {
				dx = -dx;
			}

			if (wall_hit_right || wall_hit_left) {
				moveWall(wall_hit_right, true);
			}
			// if (wall_hit_right || wall_hit_left) {
			// 	console.log({ wall_hit_right, wall_hit_left });
			// }

			// The outer bounds are hit
			if (cy - radius < 0 || cy + radius > 1) {
				// console.log(cy - radius, cy + radius);
				dy = -dy;
			}
		} else {
			// The wall is diagonal
			if (cx - radius < 0 || cx + radius > 1) {
				dx = -dx;
			}
			if (cy - radius < 0 || cy + radius > 1) {
				dy = -dy;
			}

			const { intersects, comingFrom } = intersectsWall(
				cx,
				cy,
				dx,
				dy,
				wall_x1,
				wall_y1,
				wall_x2,
				wall_y2,
				radius
			);

			if (intersects) {
				const normal = getWallNormal(wall_x1, wall_y1, wall_x2, wall_y2);
				const dotProduct = dx * normal.x + dy * normal.y;
				dx = dx - 2 * dotProduct * normal.x;
				dy = dy - 2 * dotProduct * normal.y;
				moveWall(comingFrom === 'left', false);
			}
		}
		if (is_moving) {
			requestAnimationFrame(move);
		}
	}

	// const moving = $derived.by(() => {

	// })

	function startMoving() {
		is_moving = true;
		move();
	}

	function stopMoving() {
		is_moving = false;
	}

	function moveWall(wall_hit_right: boolean, isVertical: boolean) {
		let addition = 0.01 * (wall_hit_right ? -1 : 1);
		// The addition is limited by the wall position. This prevents the wall from moving beyond the outer bounds.
		if (wall_hit_right) {
			// The addition is not greater than the distance of the wall to the left outer bound
			addition = Math.min(wall_x1, wall_x2, addition);
		} else {
			// The addition is not greater than the distance of the wall to the right outer bound
			addition = Math.min(1 - wall_x1, 1 - wall_x2, addition);
		}

		if (wall_x1 < 1 && wall_x1 > 0 && wall_x2 < 1 && wall_x2 > 0) {
			wall_x1 += addition;
			// wall_x1 = Math.min(1, Math.max(0, wall_x1));
			if (isVertical) {
				wall_x2 = wall_x1;
			} else {
				wall_x2 += addition;
			}
		}
		wall_highlight = true;
		setTimeout(() => (wall_highlight = false), 100);
	}

	function changeMode() {
		mode = mode === 'vertical' ? 'diagonal' : 'vertical';
		resetWall();
	}

	function changeShadow() {
		has_shadow = !has_shadow;
	}

	function resetWall() {
		console.log('resetWall');
		if (mode === 'vertical') {
			wall_x1 = 0.5;
			wall_x2 = 0.5;
		} else {
			wall_x1 = 0.2;
			wall_x2 = 0.8;
		}
		resetBall();
	}

	function resetBall() {
		cx = Math.random() > 0.5 ? 0.75 : 0.25;
		cy = 0.5;
		resetAngle();
	}

	function resetAngle() {
		angle = Math.random() * 2 * Math.PI;
		dx = Math.cos(angle) * speed;
		dy = Math.sin(angle) * speed;
	}

	function intersectsWall(
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

	function getWallNormal(x1: number, y1: number, x2: number, y2: number) {
		const dx = x2 - x1;
		const dy = y2 - y1;
		const length = Math.sqrt(dx * dx + dy * dy);
		return { x: -dy / length, y: dx / length };
	}

	// resetWall();

	return {
		layout: LAYOUT_LINEAR,
		size,
		radius,
		move,
		changeMode,
		changeShadow,
		resetWall,
		wall_y1,
		wall_y2,
		pulley_radius,
		pulley_off_x,
		pulley_off_y,
		startMoving,
		stopMoving,
		get is_ball_left() {
			return is_ball_left;
		},
		get wall_x1() {
			return wall_x1;
		},
		get wall_x2() {
			return wall_x2;
		},
		get cx() {
			return cx;
		},
		get cy() {
			return cy;
		},
		get wall_x() {
			return wall_x1;
		},
		get wall_highlight() {
			return wall_highlight;
		},
		get mode() {
			return mode;
		},
		get has_shadow() {
			return has_shadow;
		}
	};
}
