<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { getGridState } from '$grid/grid-state.svelte';
	const gridState = getGridState();
	const { padding } = $derived(gridState);

	const gauge_id = crypto.randomUUID();

	interface Props {
		value: number;
		label?: string;
	}
	const { value, label = 'Entropy' }: Props = $props();

	const scale = scaleLinear().domain([0, 100]).range([2, 100]);

	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	$effect(() => {
		progress.set(value);
	});
</script>

<div
	class="grid grid-rows-[1fr_auto] grid-cols-[auto_auto] gap-x-1 gap-y-2 w-full h-full justify-items-center"
	style="padding-top: {padding.top}px; box-sizing: border-box;"
	role="meter"
	aria-valuenow={value}
	aria-valuemin="0"
	aria-valuemax="100"
	aria-labelledby={gauge_id}
>
	<div
		class="bg-entropy-bar h-full w-[3px] justify-self-center place-self-end col-start-1 col-end-2 row-start-1"
		aria-hidden="true"
	></div>
	<div
		class="bg-entropy-bar h-[2px] w-[20px] justify-self-center place-self-start col-start-1 col-end-2 row-start-1"
		aria-hidden="true"
	></div>
	<span
		class="text-xs/none tracking-wider uppercase font-medium col-start-2 row-start-1 justify-self-start text-entropy-text"
		>High</span
	>
	<div
		style="height: {scale($progress)}%;"
		class="bg-highlight w-[20px] justify-self-center place-self-end col-start-1 col-end-2 row-start-1"
		aria-hidden="true"
	></div>
	<span
		class="text-xs/none tracking-wider uppercase font-medium col-start-2 row-start-1 place-self-end justify-self-start text-entropy-text"
		>Low</span
	>
	<span
		id={gauge_id}
		class="col-span-2 text-highlight font-medium text-center text-xs/none sm:text-sm/none uppercase tracking-wider"
	>
		{label}
	</span>
</div>
