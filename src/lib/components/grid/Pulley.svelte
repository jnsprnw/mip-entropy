<script lang="ts">
	import { getContext } from 'svelte';
	import { getGridState } from './grid-state.svelte';
	const gridState = getGridState();
	const { grid } = $derived(gridState);

	const { xScale, yScale, width, xRange, yRange } = getContext('LayerCake');

	const {
		wall_x1,
		wall_x2,
		pulley_off_y,
		pulley_off_x,
		pulley_radius: radius,
		selected_side
	} = $derived(grid);

	const x0 = $derived($xRange.at(0));
	const x1 = $derived($xRange.at(-1));
	const y0 = $derived($yRange.at(0));
	const y1 = $derived($yRange.at(-1));
	const xWall = $derived($xScale(wall_x1));

	const cy = $derived($yScale(1) - pulley_off_y);

	// The pulley that is based on the wall
	const cx_1 = $derived($xScale(wall_x2) + (selected_side === 'left' ? -10 : 10));

	// The pulley that is outside and based on the ball’s side
	const cx_2 = $derived(
		$xScale(selected_side === 'left' ? 0 : 1) + pulley_off_x * (selected_side === 'left' ? -1 : 1)
	);

	const cord_y = $derived($yScale(1));

	const distance = $derived(
		(1 / $width) * (selected_side === 'left' ? $width - $xScale(wall_x2) : $xScale(wall_x2))
	);

	const weight_x = $derived(cx_2 + radius * (selected_side === 'left' ? -1 : 1));
	const weight_y = $derived(cord_y + distance * $width);
</script>

{#if grid.has_weight}
	<g>
		<circle cx={cx_1} {cy} r={radius - 1.5} class="fill-slate-300 stroke-2 stroke-blue-900" />
		<circle cx={cx_2} {cy} r={radius - 1.5} class="fill-slate-300 stroke-2 stroke-blue-900" />
		{#if selected_side === 'left'}
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
{:else if grid.can_select}
	<g onclick={() => grid.selectSide('left')} class="cursor-pointer group">
		<path
			d="M {x0 + 1} {y0 - 1} H {xWall} V {y1 + 1} H {x0 + 1} Z"
			class="fill-transparent group-hover:fill-blue-600/10"
		/>
		<text x={xWall / 2} y={(y0 - y1) / 2} text-anchor="middle" dominant-baseline="middle">
			Hang left
		</text>
	</g>
	<g onclick={() => grid.selectSide('right')} class="cursor-pointer group">
		<path
			d="M {x1 - 1} {y0 - 1} H {xWall} V {y1 + 1} H {x1 - 1} Z"
			class="fill-transparent group-hover:fill-blue-600/10"
		/>
		<text x={xWall + xWall / 2} y={(y0 - y1) / 2} text-anchor="middle" dominant-baseline="middle">
			Hang right
		</text>
	</g>
{/if}
