import {
	ENTITY_COLOR_A,
	ENTITY_COLOR_B,
	OBSERVER_ALICE,
	OBSERVER_BOB,
	ENTITY_SHAPE_SQUARE,
	ENTITY_SHAPE_TRIANGLE,
	WALL_WIDTH,
	SIDE_LEFT,
	SIDE_RIGHT,
	WEIGHT_WIDTH
} from '$config';
import type { Observer, EntityColor, Particle } from '$types';
import { scaleLinear, scalePoint } from 'd3-scale';
import { range } from 'd3-array';

export const ID = 'move' as const;

// Bewegungsgeschwindigkeit
const SPEED = 0.02;

// Radius des Balls
const RADIUS = 0.03;

const WALL_MOVEMENT_PADDING = 5;

const WALL_MOVEMENT_BOUNDS = WALL_MOVEMENT_PADDING + WALL_WIDTH / 2;

export function createMove() {
	let is_moving = $state<boolean>(false);
	let has_weight = $state<boolean>(false);
	let selected_side = $state<typeof SIDE_LEFT | typeof SIDE_RIGHT | undefined>(undefined);
	let particles = $state<Particle[]>([]);
	let can_select = $state<boolean>(false);
	let observer = $state<Observer>(undefined);
	let allow_observer_switch = $state<boolean>(false);
	let show_observer_switch = $state<boolean>(false);
	let show_wall = $state<boolean>(false);
	let ignore_color = $state<EntityColor>(undefined);

	let width = $state<number>(0);
	const scale = $derived(
		scaleLinear()
			.domain([0, 1])
			.range([WALL_MOVEMENT_BOUNDS, width - WALL_MOVEMENT_BOUNDS - WEIGHT_WIDTH * 2])
	);
	const scale_inner = $derived(scaleLinear().domain([0, 1]).range([0, width]));

	const wall_width_scaled = $derived(scale_inner.invert(WALL_WIDTH / 2));
	const scaled_radius = $derived(scale.invert(RADIUS));
	// const wall_offset_scaled = $derived(scale.invert(10));
	const pulley_radius = $derived(Math.max(scale_inner.invert(10), 6));
	const hasObserver = $derived(typeof observer !== 'undefined');

	// Koordinaten der Wand
	let wall_x = $state<number>(0);

	const scale_weight = $derived(
		scaleLinear()
			.domain(selected_side === SIDE_LEFT ? scale.range().toReversed() : scale.range())
			.range([scale(0), scale(1) + WALL_MOVEMENT_BOUNDS - 48]) // 48 = Package height
	);

	const wall_x_scaled = $derived(scale_inner(wall_x));
	const weight_y = $derived(scale_weight(wall_x_scaled));

	const wall_y1 = 0;
	const wall_y2 = 1;

	let wall_highlight = $state<boolean>(false);

	const particle_max = $derived(wall_x + scaled_radius + wall_width_scaled);
	const particle_min = $derived(wall_x - scaled_radius - wall_width_scaled);

	function move() {
		particles = particles.map((particle) => {
			const max_x = particle.cx > wall_x ? 1 : particle_min;
			const min_x = particle.cx > wall_x ? particle_max : 0;

			particle.cx += particle.dx;
			particle.cy += particle.dy;

			// The wall was hit on the right hand side. Particle is on the left side of the wall.
			const wall_hit_right = checkIfWallHitRight(
				particle,
				RADIUS,
				wall_x,
				wall_width_scaled,
				ignore_color
			);

			// The wall was hit on the right hand side
			const wall_hit_left =
				!wall_hit_right &&
				checkIfWallHitLeft(particle, RADIUS, wall_x, wall_width_scaled, ignore_color);

			// The wall or outer bounds are hit
			if (particle.cx - RADIUS < 0 || wall_hit_right || wall_hit_left || particle.cx + RADIUS > 1) {
				particle.dx = -particle.dx;
			}

			// This moves the wall if the particle has weight and hits the wall from the selected side
			// if (
			// 	((wall_hit_right && selected_side === SIDE_RIGHT) ||
			// 		(wall_hit_left && selected_side === SIDE_LEFT)) &&
			// 	has_weight
			// ) {
			// 	moveWall(wall_hit_right);
			// }

			// This moves the wall if the particle has weight and hits the wall from any side
			if ((wall_hit_right || wall_hit_left) && has_weight) {
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

	function selectSide(side: typeof SIDE_LEFT | typeof SIDE_RIGHT | undefined) {
		selected_side = side;
		has_weight = side === SIDE_LEFT || side === SIDE_RIGHT;
		startMoving();
	}

	function selectLeftSide() {
		selected_side = SIDE_LEFT;
		has_weight = true;
	}

	function selectRightSide() {
		selected_side = SIDE_RIGHT;
		has_weight = true;
	}

	function selectNoSide() {
		selected_side = undefined;
		has_weight = false;
	}

	function resetSide() {
		is_moving = false;
		selected_side = undefined;
		has_weight = false;
		can_select = true;
		resetWall();
		resetParticleOneSide();
	}

	function startMoving() {
		is_moving = true;
		move();
	}

	function stopMoving() {
		is_moving = false;
	}

	const WALL_SPEED = 0.01;

	const is_wall_ended: boolean | undefined = $derived.by(() => {
		if (typeof selected_side === 'undefined') {
			return undefined;
		}
		if (
			(wall_x <= 0 && selected_side === SIDE_RIGHT) ||
			(wall_x >= 1 && selected_side === SIDE_LEFT)
		) {
			return true;
		}
		if (
			(wall_x <= 0 && selected_side === SIDE_LEFT) ||
			(wall_x >= 1 && selected_side === SIDE_RIGHT)
		) {
			return false;
		}
		return undefined;
	});

	function moveWall(
		wall_hit_right: boolean,
		without_highlight: boolean = false,
		speed: number = WALL_SPEED
	) {
		if (wall_x > 0 && wall_x < 1) {
			if (wall_hit_right) {
				// The addition is not greater than the distance of the wall to the left outer bound
				wall_x = Math.max(0, wall_x - speed);
			} else {
				// The addition is not greater than the distance of the wall to the right outer bound
				wall_x = Math.min(1, wall_x + speed);
			}

			if (!without_highlight) {
				wall_highlight = true;
				setTimeout(function () {
					wall_highlight = false;
				}, 100);
			}
		}
	}

	let interval: number | undefined;

	function animateWallMovement() {
		let direction: boolean = true;
		interval = setInterval(function () {
			moveWall(direction, true, 0.01);
			if (wall_x >= 0.9 || wall_x <= 0.1) {
				direction = !direction;
			}
		}, 30);
	}

	function stopAnimateWallMovement() {
		clearInterval(interval);
	}

	function resetWall() {
		wall_x = 0.5;
	}

	function resetParticleOneSide() {
		resetParticles(5, 'random');
	}

	function resetParticles(
		count: number = 2,
		side: typeof SIDE_LEFT | typeof SIDE_RIGHT | 'random' | undefined = undefined,
		fill?: 'red' | 'blue' | 'alternately' | undefined,
		form?: undefined | 'alternately'
	) {
		const scaleY = scalePoint().range([0, 1]).domain(range(count).map(String)).padding(0.6);
		const arr: Particle[] = [];
		const random_side = Math.random() > 0.5 ? SIDE_RIGHT : SIDE_LEFT;
		for (let i = 0; i < count; i++) {
			const angle = Math.random() * 2 * Math.PI;
			let cx: number = i % 2 ? 0.75 : 0.25;
			if (side === 'random') {
				cx = random_side === SIDE_LEFT ? 0.25 : 0.75;
			} else if (side === SIDE_LEFT) {
				cx = 0.25;
			} else if (side === SIDE_RIGHT) {
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

	function removeParticles() {
		particles = [];
	}

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
		isLinear: true,
		selectSide,
		radius: RADIUS,
		move,
		resetWall,
		// resetBall,
		wall_y1,
		wall_y2,
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
		showWall,
		hideWall,
		selectLeftSide,
		selectRightSide,
		resetSide,
		moveWall,
		animateWallMovement,
		stopAnimateWallMovement,
		resetParticleOneSide,
		selectNoSide,
		removeParticles,
		setNoIgnoreColor() {
			ignore_color = undefined;
		},
		setRedIgnoreColor() {
			ignore_color = ENTITY_COLOR_B;
		},
		get pulley_radius() {
			return pulley_radius;
		},
		set width(value: number) {
			width = value;
		},
		get is_wall_ended() {
			return is_wall_ended;
		},
		get bounds() {
			return {
				x0: scale(0),
				x1: scale(1)
			};
		},
		get weight_distance() {
			return weight_y;
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
		get wall_x() {
			return wall_x_scaled;
		},
		get wall_highlight() {
			return wall_highlight;
		},
		get hasObserver() {
			return hasObserver;
		},
		get particle_max() {
			return particle_max;
		},
		get particle_min() {
			return particle_min;
		},
		get width() {
			return width;
		}
	};
}
