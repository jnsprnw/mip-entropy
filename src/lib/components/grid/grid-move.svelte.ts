export function createMove(size: number = 6) {
	let mode = $state<'vertical' | 'diagonal'>('vertical');
	let has_shadow = $state(false);
	let cx = $state(Math.random() > 0.5 ? 0.75 : 0.25);
	let cy = $state(0.5);

	let wall_x = $state(0.5);
	let wall_highlight = $state(false);

	const radius = 0.05;

	const speed = 0.005;

	const angle = Math.random() * 2 * Math.PI;

	let dx = Math.cos(angle) * speed;
	let dy = Math.sin(angle) * speed;

	function move() {
		cx += dx;
		cy += dy;

		if (mode === 'vertical') {
			const wall_hit_right = cx + radius > wall_x && cx < wall_x;
			const wall_hit_left = cx - radius < wall_x && cx > wall_x;

			if (cx - radius < 0 || wall_hit_right || wall_hit_left || cx + radius > 1) {
				dx = -dx;
			}

			if ((wall_x < 1 && wall_x > 0 && wall_hit_right) || wall_hit_left) {
				wall_x += 0.005 * (wall_hit_right ? 1 : -1);
				wall_highlight = true;
				setTimeout(() => (wall_highlight = false), 100);
			}

			if (cy - radius < 0 || cy + radius > 1) {
				dy = -dy;
			}
		} else {
			if (cx - radius < 0 || cx + radius > 1) {
				dx = -dx;
			}
			if (cy - radius < 0 || cy + radius > 1) {
				dy = -dy;
			}

			if (intersectsWall(cx, cy, dx, dy, 0, 0, 1, 1)) {
				const normal = getWallNormal(0, 0, 1, 1);
				const dotProduct = dx * normal.x + dy * normal.y;
				dx = dx - 2 * dotProduct * normal.x;
				dy = dy - 2 * dotProduct * normal.y;
			}
		}
	}

	function changeMode() {
		mode = mode === 'vertical' ? 'diagonal' : 'vertical';
	}

	function changeShadow() {
		has_shadow = !has_shadow;
	}

	function resetWall() {
		wall_x = 0.5;
	}

	function intersectsWall(x, y, dx, dy, x1, y1, x2, y2) {
		// Berechnen der nächsten Position des Balls
		const nextX = x + dx;
		const nextY = y + dy;

		// Berechnen der Distanz von der Linie (Mauer) zur nächsten Position des Balls
		const dist =
			Math.abs((y2 - y1) * nextX - (x2 - x1) * nextY + x2 * y1 - y2 * x1) /
			Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);

		return dist <= radius;
	}

	function getWallNormal(x1, y1, x2, y2) {
		const dx = x2 - x1;
		const dy = y2 - y1;
		const length = Math.sqrt(dx * dx + dy * dy);
		return { x: -dy / length, y: dx / length };
	}

	return {
		size,
		radius,
		move,
		changeMode,
		changeShadow,
		resetWall,
		get cx() {
			return cx;
		},
		get cy() {
			return cy;
		},
		get wall_x() {
			return wall_x;
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
