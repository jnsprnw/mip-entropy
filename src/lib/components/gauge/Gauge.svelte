<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { PADDING_GRID } from '$config';

	const gauge_id = crypto.randomUUID();

	interface Props {
		value: number;
		label?: string;
	}
	const { value, label = 'Entropy' }: Props = $props();

	const scale = scaleLinear().domain([0, 100]).range([10, 100]);

	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	$effect(() => {
		progress.set(value);
	});
</script>

<div
	class="grid grid-rows-[1fr_auto] gap-y-2 w-full h-full justify-items-center"
	style="padding-top: {PADDING_GRID.top}px; box-sizing: border-box;"
	role="meter"
	aria-valuenow={value}
	aria-valuemin="0"
	aria-valuemax="100"
	aria-labelledby={gauge_id}
>
	<span
		class="bg-entropy-bar h-full w-[5px] justify-self-center place-self-end col-start-1 col-end-2 row-start-1"
		aria-hidden="true"
	></span>
	<span
		style="height: {scale($progress)}%;"
		class="bg-highlight w-2/5 justify-self-center place-self-end col-start-1 col-end-2 row-start-1"
		aria-hidden="true"
	></span>
	<span id={gauge_id} class="text-highlight font-semibold text-center text-xs/none">{label}</span>
</div>
