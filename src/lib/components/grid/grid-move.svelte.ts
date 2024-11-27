import {
	PADDING_GRID,
	LAYOUT_LINEAR,
	ENTITY_COLOR_A,
	ENTITY_COLOR_B,
	OBSERVER_ALICE,
	OBSERVER_BOB,
	ENTITY_SHAPE_SQUARE,
	ENTITY_SHAPE_TRIANGLE,
	WALL_WIDTH
} from '$config';
import { random } from 'lodash-es';
import type { Observer, EntityColor } from '$types';
import { scaleLinear, scalePoint } from 'd3-scale';
import { range } from 'd3-array';

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

export function createMove() {
	let mode = $state<'vertical' | 'diagonal'>('vertical');
	let is_moving = $state<boolean>(false);
	let has_weight = $state<boolean>(false);
	let selected_side = $state<'left' | 'right' | null>(null);
	let particles = $state<Particle[]>([]);
	let can_select = $state<boolean>(false);
	let observer = $state<Observer>(undefined);
	let allow_observer_switch = $state<boolean>(false);
	let show_observer_switch = $state<boolean>(false);
	let show_wall = $state<boolean>(false);
	let ignore_color = $state<EntityColor>(undefined);

	let width = $state<number>(0);
	const scale = $derived(scaleLinear().domain([0, 1]).range([0, width]));
	const wall_width_scaled = $derived(scale.invert(WALL_WIDTH / 2));
	const wall_offset_scaled = $derived(scale.invert(10));

	// Koordinaten der Wand
	let wall_x1 = $state<number>(0);
	let wall_x2 = $state<number>(0);

	const wall_y1 = 0;
	const wall_y2 = 1;

	let wall_highlight = $state<boolean>(false);
	let has_shadow = $state<boolean>(false);

	function move() {
		particles = particles.map((particle) => {
			particle.cx += particle.dx;
			particle.cy += particle.dy;

			// The wall was hit on the right hand side. Particle is on the left side of the wall.
			const wall_hit_right =
				particle.color !== ignore_color &&
				particle.cx - RADIUS <= wall_x1 + wall_width_scaled &&
				particle.cx > wall_x1;

			// The wall was hit on the right hand side
			const wall_hit_left =
				particle.color !== ignore_color &&
				particle.cx + RADIUS >= wall_x1 - wall_width_scaled &&
				particle.cx < wall_x1;

			// The wall or outer bounds are hit
			if (particle.cx - RADIUS < 0 || wall_hit_right || wall_hit_left || particle.cx + RADIUS > 1) {
				particle.dx = -particle.dx;
			}

			if (
				((wall_hit_right && selected_side === 'right') ||
					(wall_hit_left && selected_side === 'left')) &&
				has_weight
			) {
				moveWall(wall_hit_right);
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

	function selectRightSide() {
		selected_side = 'right';
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

	const WALL_SPEED = 0.01;

	function moveWall(
		wall_hit_right: boolean,
		without_highlight: boolean = false,
		speed: number = WALL_SPEED
	) {
		if (
			wall_x1 > wall_width_scaled + wall_offset_scaled &&
			wall_x1 < 1 - wall_width_scaled - wall_offset_scaled
		) {
			if (wall_hit_right) {
				// The addition is not greater than the distance of the wall to the left outer bound
				wall_x1 = Math.max(wall_width_scaled, wall_x1 - speed);
			} else {
				// The addition is not greater than the distance of the wall to the right outer bound
				wall_x1 = Math.min(1 - wall_width_scaled, wall_x1 + speed);
			}
			wall_x2 = wall_x1;

			if (!without_highlight) {
				wall_highlight = true;
				setTimeout(() => (wall_highlight = false), 100);
			}
		}
	}

	let interval: number | undefined;

	function animateWallMovement() {
		let direction: boolean = true;
		let counter: number = 0;
		interval = setInterval(function () {
			if (counter > 50 || counter < 0) {
				direction = !direction;
			}
			counter = counter + (direction ? 1 : -1);
			moveWall(direction, true, 0.005);
		}, 30);

		// setTimeout(() => moveWall(false, true), 100);
	}

	function stopAnimateWallMovement() {
		clearInterval(interval);
	}

	function changeMode() {
		mode = mode === 'vertical' ? 'diagonal' : 'vertical';
		resetWall();
	}

	function changeShadow() {
		has_shadow = !has_shadow;
	}

	function resetWall() {
		wall_x1 = 0.5;
		wall_x2 = 0.5;
		// if (!particles.length) {
		// 	resetParticleOneSide();
		// 	// resetParticles(4, undefined, 'alternately', 'alternately');
		// }
		// resetBall();
	}

	function resetParticleOneSide() {
		resetParticles(5, 'left');
	}

	function rLeft() {
		return random(0.1, 0.4);
	}
	function rRight() {
		return random(0.6, 0.9);
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
				shape: ENTITY_SHAPE_TRIANGLE,
				color: ENTITY_COLOR_A
			},
			{
				cx: rLeft(),
				cy: rPosition(),
				...rAngle(),
				radius: RADIUS,
				shape: ENTITY_SHAPE_SQUARE,
				color: ENTITY_COLOR_A
			},
			{
				cx: rRight(),
				cy: rPosition(),
				...rAngle(),
				radius: RADIUS,
				shape: ENTITY_SHAPE_TRIANGLE,
				color: ENTITY_COLOR_B
			},
			{
				cx: rRight(),
				cy: rPosition(),
				...rAngle(),
				radius: RADIUS,
				shape: ENTITY_SHAPE_SQUARE,
				color: ENTITY_COLOR_B
			},
			{
				cx: rLeft(),
				cy: rPosition(),
				...rAngle(),
				radius: RADIUS,
				shape: ENTITY_SHAPE_TRIANGLE,
				color: ENTITY_COLOR_A
			},
			{
				cx: rLeft(),
				cy: rPosition(),
				...rAngle(),
				radius: RADIUS,
				shape: ENTITY_SHAPE_SQUARE,
				color: ENTITY_COLOR_A
			},
			{
				cx: rRight(),
				cy: rPosition(),
				...rAngle(),
				radius: RADIUS,
				shape: ENTITY_SHAPE_TRIANGLE,
				color: ENTITY_COLOR_B
			},
			{
				cx: rRight(),
				cy: rPosition(),
				...rAngle(),
				radius: RADIUS,
				shape: ENTITY_SHAPE_SQUARE,
				color: ENTITY_COLOR_B
			}
		];
	}

	function resetParticles(
		count: number = 2,
		side: 'left' | 'right' | 'random' | undefined = undefined,
		fill?: 'red' | 'blue' | 'alternately' | undefined,
		form?: undefined | 'alternately'
	) {
		const scaleY = scalePoint().range([0, 1]).domain(range(count).map(String)).padding(0.6);
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
				shape = i % 2 ? ENTITY_SHAPE_SQUARE : ENTITY_SHAPE_TRIANGLE;
			}
			let color = fill ?? ENTITY_COLOR_A;
			if (fill === 'alternately') {
				color = i % 2 ? ENTITY_COLOR_A : ENTITY_COLOR_B;
			}
			arr.push({
				cx,
				cy: scaleY(String(i)),
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

	function setObserver(value: Observer) {
		observer = value;
	}

	function setAlice() {
		setObserver(OBSERVER_ALICE);
	}

	function setBob() {
		setObserver(OBSERVER_BOB);
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
		selectRightSide,
		resetSide,
		moveWall,
		animateWallMovement,
		stopAnimateWallMovement,
		resetParticleOneSide,
		setNoIgnoreColor() {
			ignore_color = undefined;
		},
		setRedIgnoreColor() {
			ignore_color = ENTITY_COLOR_B;
		},
		set width(value: number) {
			width = value;
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
