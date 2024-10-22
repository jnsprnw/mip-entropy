<script lang="ts">
	import { getContext } from 'svelte';

	const { xScale, yScale, width } = getContext('LayerCake');

	const grid = getContext('Grid');
	const {
		wall_x1,
		wall_y1,
		wall_x2,
		pulley_off_y,
		pulley_off_x,
		is_ball_left,
		pulley_radius: radius
	} = $derived(grid);

	const cy = $derived($yScale(1) - pulley_off_y);

	// The pulley that is based on the wall
	const cx_1 = $derived($xScale(wall_x2) + (is_ball_left ? -10 : 10));

	// The pulley that is outside and based on the ball’s side
	const cx_2 = $derived($xScale(is_ball_left ? 0 : 1) + pulley_off_x * (is_ball_left ? -1 : 1));

	const cord_y = $derived($yScale(1));

	const distance = $derived(
		(1 / $width) * (is_ball_left ? $width - $xScale(wall_x2) : $xScale(wall_x2))
	);

	const weight_x = $derived(cx_2 + radius * (is_ball_left ? -1 : 1));
	const weight_y = $derived(cord_y + distance * $width);
</script>

<g>
	<circle cx={cx_1} {cy} r={radius - 1.5} class="fill-slate-300 stroke-2 stroke-blue-900" />
	<circle cx={cx_2} {cy} r={radius - 1.5} class="fill-slate-300 stroke-2 stroke-blue-900" />
	{#if is_ball_left}
		<path
			d="
				M {$xScale(wall_x2)} {cord_y}
				L {cx_1 + radius} {cy}
				C {cx_1 + radius} {cy}, {cx_1 + radius} {cy - radius}, {cx_1} {cy - radius}
				L {cx_2} {cy - radius}
				C {cx_2} {cy - radius}, {cx_2 - radius} {cy - radius}, {cx_2 - radius} {cy}
				L {weight_x} {cord_y}
				L {weight_x} {weight_y}
			"
			class="fill-none stroke-2 stroke-amber-500"
		/>
	{:else}
		<path
			d="
				M {$xScale(wall_x2)} {cord_y}
				L {cx_1 - radius} {cy}
				C {cx_1 - radius} {cy}, {cx_1 - radius} {cy - radius}, {cx_1} {cy - radius}
				L {cx_2} {cy - radius}
				C {cx_2} {cy - radius}, {cx_2 + radius} {cy - radius}, {cx_2 + radius} {cy}
				L {weight_x} {cord_y}
				L {weight_x} {weight_y}
			"
			class="fill-none stroke-2 stroke-amber-500"
		/>
	{/if}
	<path
		d="
				M {weight_x - 20 / 2} {weight_y}
				L {weight_x + 20 / 2} {weight_y}
				L {weight_x + 25 / 2} {weight_y + 22}
				L {weight_x - 25 / 2} {weight_y + 22}
				Z
			"
		stroke-linejoin="round"
		class="stroke-2 stroke-blue-900 fill fill-slate-300"
	/>
</g>
