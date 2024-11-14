import { PADDING_GRID, LAYOUT_LINEAR, MODE_MOVE } from '$config';
import { random } from 'lodash-es';

export const ID = 'move' as const;

const pulley_radius = 10;
const pulley_off_x = PADDING_GRID.left / 2;
const pulley_off_y = PADDING_GRID.top / 2;

// Bewegungsgeschwindigkeit
const SPEED = 0.02;

// Radius des Balls
const RADIUS = 0.03;

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
	color: string | undefined;
	shape: string;
};

export function createMove(size: number = 6) {
	let mode = $state<'vertical' | 'diagonal'>('vertical');
	let is_moving = $state<boolean>(false);
	let has_weight = $state<boolean>(false);
	let selected_side = $state<'left' | 'right' | null>(null);
	let particles = $state<Particle[]>([]);
	let can_select = $state<boolean>(false);
	let observer = $state<undefined | 'alice' | 'bob'>('alice');
	let allow_observer_switch = $state<boolean>(false);
	let show_observer_switch = $state<boolean>(false);
	let show_wall = $state<boolean>(false);
	let ignore_color = $state<'blue' | 'red' | undefined>(undefined);

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
			const wall_hit_right =
				particle.color !== ignore_color && particle.cx - RADIUS <= wall_x1 && particle.cx > wall_x1;
			// The wall was hit on the right hand side
			const wall_hit_left =
				particle.color !== ignore_color && particle.cx + RADIUS >= wall_x1 && particle.cx < wall_x1;

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

	function selectLeftSide() {
		selected_side = 'left';
		has_weight = true;
		// startMoving();
	}

	function resetSide() {
		selected_side = null;
		has_weight = false;
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
		if (!particles.length) {
			resetParticleOneSide();
			// resetParticles(4, undefined, 'alternately', 'alternately');
		}
		// resetBall();
	}

	function resetParticleOneSide() {
		resetParticles(4, 'random');
	}

	function rLeft() {
		return random(0.1, 0.4);
	}
	function rRight() {
		return random(0.6, 0.9);
	}
	function rTop() {
		return random(0.2, 0.4);
	}
	function rBottom() {
		return random(0.6, 0.8);
	}
	function rMiddle() {
		return random(0.4, 0.6);
	}
	function rPosition() {
		return random(0.1, 0.9);
	}
	function rAngle() {
		const angle = Math.random() * 2 * Math.PI;
		return {
			dx: Math.cos(angle) * SPEED,
			dy: Math.sin(angle) * SPEED,
			angle
		};
	}

	function setParticles() {
		particles = [
			{
				cx: rLeft(),
				cy: rPosition(),
				...rAngle(),
				radius: RADIUS,
				shape: 'triangle',
				color: 'red'
			},
			{
				cx: rLeft(),
				cy: rPosition(),
				...rAngle(),
				radius: RADIUS,
				shape: 'square',
				color: 'red'
			},
			{
				cx: rRight(),
				cy: rPosition(),
				...rAngle(),
				radius: RADIUS,
				shape: 'triangle',
				color: 'blue'
			},
			{
				cx: rRight(),
				cy: rPosition(),
				...rAngle(),
				radius: RADIUS,
				shape: 'square',
				color: 'blue'
			},
			{
				cx: rLeft(),
				cy: rPosition(),
				...rAngle(),
				radius: RADIUS,
				shape: 'triangle',
				color: 'red'
			},
			{
				cx: rLeft(),
				cy: rPosition(),
				...rAngle(),
				radius: RADIUS,
				shape: 'square',
				color: 'red'
			},
			{
				cx: rRight(),
				cy: rPosition(),
				...rAngle(),
				radius: RADIUS,
				shape: 'triangle',
				color: 'blue'
			},
			{
				cx: rRight(),
				cy: rPosition(),
				...rAngle(),
				radius: RADIUS,
				shape: 'square',
				color: 'blue'
			}
		];
	}

	function resetParticles(
		count: number = 2,
		side: 'left' | 'right' | 'random' | undefined = undefined,
		fill?: 'red' | 'blue' | 'alternately' | undefined,
		form?: undefined | 'alternately'
	) {
		const arr: Particle[] = [];
		const random_side = Math.random() > 0.5 ? 'right' : 'left';
		for (let i = 0; i < count; i++) {
			const angle = Math.random() * 2 * Math.PI;
			let cx: number = i % 2 ? 0.75 : 0.25;
			if (side === 'random') {
				cx = random_side === 'left' ? random(0.2, 0.4) : random(0.6, 0.8);
			} else if (side === 'left') {
				cx = 0.25;
			} else if (side === 'right') {
				cx = 0.75;
			}
			let shape = 'circle';
			if (form === 'alternately') {
				shape = i % 2 ? 'square' : 'triangle';
			}
			let color = fill;
			if (fill === 'alternately') {
				color = i % 2 ? 'red' : 'blue';
			}
			arr.push({
				cx,
				cy: random(0.1, 0.3),
				angle,
				dx: Math.cos(angle) * SPEED,
				dy: Math.sin(angle) * SPEED,
				radius: RADIUS,
				shape,
				color
			});
		}
		particles = arr;
	}

	// function resetBall() {
	// 	resetParticles(4, 'random');
	// 	// cx = Math.random() > 0.5 ? 0.75 : 0.25;
	// 	// cy = 0.5;
	// 	// resetAngle();
	// }

	function allowSelectSide() {
		can_select = true;
	}

	function disallowSelectSide() {
		can_select = false;
	}

	function setObserver(value: 'alice' | 'bob' | undefined) {
		observer = value;
	}

	function setAlice() {
		setObserver('alice');
	}

	function setBob() {
		setObserver('bob');
	}

	function allowObserverSwitch() {
		allow_observer_switch = true;
	}

	function disallowObserverSwitch() {
		allow_observer_switch = false;
	}

	function showObserverSwitch() {
		show_observer_switch = true;
	}

	function hideObserverSwitch() {
		show_observer_switch = false;
	}

	function showWall() {
		show_wall = true;
	}
	function hideWall() {
		show_wall = false;
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
		// resetBall,
		wall_y1,
		wall_y2,
		pulley_radius,
		pulley_off_x,
		pulley_off_y,
		startMoving,
		stopMoving,
		allowSelectSide,
		disallowSelectSide,
		setAlice,
		setBob,
		allowObserverSwitch,
		disallowObserverSwitch,
		showObserverSwitch,
		hideObserverSwitch,
		setObserver,
		setParticles,
		showWall,
		hideWall,
		selectLeftSide,
		resetSide,
		setNoIgnoreColor() {
			ignore_color = undefined;
		},
		setRedIgnoreColor() {
			ignore_color = 'blue';
		},
		get show_wall() {
			return show_wall;
		},
		get allow_observer_switch() {
			return allow_observer_switch;
		},
		get show_observer_switch() {
			return show_observer_switch;
		},
		get observer() {
			return observer;
		},
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
