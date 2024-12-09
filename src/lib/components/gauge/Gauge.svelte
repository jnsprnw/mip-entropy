<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { getGridState } from '$grid/grid-state.svelte';
	import { getObserverDetail } from '$grid/utils-order';
	import type { Observer } from '$types';
	import { OBSERVER_BOB } from '$config';
	const gridState = getGridState();
	const { padding } = $derived(gridState);

	const gauge_id = crypto.randomUUID();

	interface Props {
		value: number;
		label?: string;
		observer?: Observer;
	}
	const { value, label = 'Entropy', observer }: Props = $props();

	const scale = scaleLinear().domain([0, 100]).range([2, 100]);

	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	$effect(() => {
		progress.set(value);
	});

	const fill = $derived(observer === OBSERVER_BOB ? 'bg-highlight-bob' : 'bg-highlight');
	const text = $derived(observer === OBSERVER_BOB ? 'text-highlight-bob' : 'text-highlight');
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
		class="{fill} w-[20px] justify-self-center place-self-end col-start-1 col-end-2 row-start-1"
		aria-hidden="true"
	></div>
	<span
		class="text-xs/none tracking-wider uppercase font-medium col-start-2 row-start-1 place-self-end justify-self-start text-entropy-text"
		>Low</span
	>
	<span
		id={gauge_id}
		class="{text} col-span-2 font-medium text-center text-xs/none sm:text-sm/none uppercase tracking-wider"
	>
		{observer ? getObserverDetail(observer).label : label}
	</span>
</div>
