import { PADDING_GRID, LAYOUT_LINEAR, MODE_MOVE } from '$config';

export const ID = 'move' as const;

const pulley_radius = 10;
const pulley_off_x = PADDING_GRID.left / 2;
const pulley_off_y = PADDING_GRID.top / 2;

// Bewegungsgeschwindigkeit
const SPEED = 0.03;

// Radius des Balls
const RADIUS = 0.05;

type Particle = {
	// Koordinaten des Balls
	cx: number;
	cy: number;
	// Winkel der Bewegung
	angle: number;
	// Beweungsrichtung
	dx: number;
	dy: number;
	radius: number;
};

export function createMove(size: number = 6) {
	let mode = $state<'vertical' | 'diagonal'>('vertical');
	let is_moving = $state<boolean>(false);
	let has_weight = $state<boolean>(false);
	let selected_side = $state<'left' | 'right' | null>(null);
	let particles = $state<Particle[]>([]);
	let can_select = $state<boolean>(false);

	// Koordinaten der Wand
	let wall_x1 = $state<number>(0);
	let wall_x2 = $state<number>(0);

	const wall_y1 = 0;
	const wall_y2 = 1;

	let wall_highlight = $state<boolean>(false);
	let has_shadow = $state<boolean>(false);

	// const is_ball_left = $derived.by(() => {
	// 	const wallDirX = wall_x2 - wall_x1;
	// 	const wallDirY = wall_y2 - wall_y1;

	// 	// Vektor vom Startpunkt der Wand zum Ball
	// 	const ballVecX = cx - wall_x1;
	// 	const ballVecY = cy - wall_y1;

	// 	// Berechne das Kreuzprodukt
	// 	const crossProduct = wallDirX * ballVecY - wallDirY * ballVecX;

	// 	// Wenn das Kreuzprodukt positiv ist, befindet sich der Ball rechts von der Wand
	// 	return crossProduct > 0;
	// });

	function move() {
		particles = particles.map((particle) => {
			particle.cx += particle.dx;
			particle.cy += particle.dy;

			// The wall was hit on the right hand side
			const wall_hit_right = particle.cx - RADIUS <= wall_x1 && particle.cx > wall_x1;
			// The wall was hit on the right hand side
			const wall_hit_left = particle.cx + RADIUS >= wall_x1 && particle.cx < wall_x1;

			// The wall or outer bounds are hit
			if (particle.cx - RADIUS < 0 || wall_hit_right || wall_hit_left || particle.cx + RADIUS > 1) {
				particle.dx = -particle.dx;
			}

			if (
				((wall_hit_right && selected_side === 'right') ||
					(wall_hit_left && selected_side === 'left')) &&
				has_weight
			) {
				moveWall(wall_hit_right, true);
			}

			// The outer bounds are hit
			if (particle.cy - RADIUS < 0 || particle.cy + RADIUS > 1) {
				particle.dy = -particle.dy;
			}
			return particle;
		});

		if (is_moving) {
			requestAnimationFrame(move);
		}
	}

	function selectSide(side: 'left' | 'right' | null) {
		selected_side = side;
		has_weight = side === 'left' || side === 'right';
		startMoving();
	}

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
		if (mode === 'vertical') {
			wall_x1 = 0.5;
			wall_x2 = 0.5;
		} else {
			wall_x1 = 0.2;
			wall_x2 = 0.8;
		}
		resetBall();
	}

	function resetParticles(count: number = 2) {
		const arr: Particle[] = [];
		for (let i = 0; i < count; i++) {
			const angle = Math.random() * 2 * Math.PI;
			arr.push({
				cx: i % 2 ? 0.75 : 0.25,
				cy: 0.2,
				angle,
				dx: Math.cos(angle) * SPEED,
				dy: Math.sin(angle) * SPEED,
				radius: RADIUS
			});
		}
		particles = arr;
	}

	function resetBall() {
		resetParticles();
		// cx = Math.random() > 0.5 ? 0.75 : 0.25;
		// cy = 0.5;
		// resetAngle();
	}

	function allowSelectSide() {
		can_select = true;
	}

	function disallowSelectSide() {
		can_select = false;
	}

	return {
		layout: LAYOUT_LINEAR,
		selectSide,
		size,
		radius: RADIUS,
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
		allowSelectSide,
		disallowSelectSide,
		get can_select() {
			return can_select;
		},
		get particles() {
			return particles;
		},
		get selected_side() {
			return selected_side;
		},
		get has_weight() {
			return has_weight;
		},
		get wall_x1() {
			return wall_x1;
		},
		get wall_x2() {
			return wall_x2;
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
