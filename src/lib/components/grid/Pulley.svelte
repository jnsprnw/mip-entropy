<script lang="ts">
	import { getContext } from 'svelte';
	import { getGridState } from '$grid/grid-state.svelte';
	const gridState = getGridState();
	const { grid, padding } = $derived(gridState);
	import Package from '$icons/Package.svelte';
	import { WEIGHT_WIDTH, SIDE_LEFT } from '$config';

	const { xScale, yScale, width } = getContext('LayerCake');

	const { wall_x2, pulley_radius: radius, selected_side } = $derived(grid);

	const cy = $derived($yScale(1) - padding.top / 2);

	// The pulley that is outside and based on the ball’s side
	const cx_2 = $derived(
		$xScale(selected_side === SIDE_LEFT ? 0 : 1) +
			(padding.left / 2) * (selected_side === SIDE_LEFT ? -1 : 1)
	);

	const cord_y = $derived($yScale(1));

	const distance = $derived(
		(1 / $width) * (selected_side === SIDE_LEFT ? $width - $xScale(wall_x2) : $xScale(wall_x2))
	);

	const weight_x = $derived(cx_2 + radius * (selected_side === SIDE_LEFT ? -1 : 1));
	const weight_y = $derived(cord_y + distance * $width - 20); // 20 is half the weight height
</script>

{#if grid.has_weight}
	<g>
		{#if selected_side === SIDE_LEFT}
			<path
				d="
				M {$xScale(wall_x2)} {cy - radius}
				L {cx_2} {cy - radius}
				C {cx_2} {cy - radius}, {cx_2 - radius} {cy - radius}, {cx_2 - radius} {cy}
				L {weight_x} {cord_y}
				L {weight_x} {weight_y}
			"
				class="fill-none stroke-2 stroke-wall-cord"
			/>
		{:else}
			<path
				d="
				M {$xScale(wall_x2)} {cy - radius}
				L {cx_2} {cy - radius}
				C {cx_2} {cy - radius}, {cx_2 + radius} {cy - radius}, {cx_2 + radius} {cy}
				L {weight_x} {cord_y}
				L {weight_x} {weight_y}
			"
				class="fill-none stroke-2 stroke-wall-cord"
			/>
		{/if}
		<g style="transform: translate({cx_2}px, {cy}px);">
			<circle r={radius + 4} class="fill-[#2B3C83]" />
			<circle r={radius} class="fill-[#2B3C83] stroke-[#00AAE9] stroke-[1.5px]" />
			<circle r="2" class="fill-[#00AAE9]" />
		</g>
		<g style="transform: translate({weight_x - WEIGHT_WIDTH / 2}px, {weight_y}px);">
			<Package />
		</g>
	</g>
{/if}
