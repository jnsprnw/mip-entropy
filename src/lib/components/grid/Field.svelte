<script lang="ts">
	import { getX, getY } from '$lib/utils/utils';
	import { fade } from 'svelte/transition';
	import { getContext } from 'svelte';
	import { MODE_GUESS } from '$config';

	const { xScale, yScale } = getContext('LayerCake');

	import { getGridState } from './grid-state.svelte';
	const gridState = getGridState();
	const { grid } = $derived(gridState);

	const { position = 0, fill = undefined } = $props();

	const color = $derived.by(() => {
		if (grid.observer === 'bob') {
			return 'fill-slate-300';
		}
		switch (fill?.color) {
			case 'blue':
				return 'fill-violet-300';
			case 'red':
				return 'fill-emerald-300';
			default:
				return undefined;
		}
	});

	const step = $derived($xScale.step());
	const xBandwidth = $derived($xScale.bandwidth() / 2);
	const yBandwidth = $derived($yScale.bandwidth() / 2);
</script>

<g
	transform="translate({$xScale(getX(position)) + xBandwidth}, {$yScale(getY(position)) +
		yBandwidth})"
>
	{#if typeof fill !== 'undefined'}
		{#if typeof fill === 'boolean'}
			<circle cx={0} cy={0} r="10" class="stroke-2 stroke-blue-900 fill-amber-300" />
		{:else if grid.observer === 'alice'}
			<circle cx={0} cy={0} r="8" class="stroke-2 stroke-blue-900 fill transition-colors {color}" />
		{:else if fill.figure === 'square'}
			<rect
				x={-8}
				y={-8}
				width="16"
				height="16"
				stroke-linejoin="round"
				class="stroke-2 stroke-blue-900 fill transition-colors {color}"
			/>
		{:else if fill.figure === 'triangle'}
			<polygon
				points="-8,8 8,8 0,-8"
				stroke-linejoin="round"
				class="stroke-2 stroke-blue-900 fill transition-colors {color}"
			/>
		{/if}
	{/if}
	{#if grid.mode === MODE_GUESS && !grid.guesses[position]}
		<path
			in:fade={{ duration: 500 }}
			d="M {-step / 2 + 0.5} {-step / 2 + 0.5} h {step - 1} v {step - 1} h {-step + 1} Z"
			class="fill fill-blue-900 transition-colors hover:fill-blue-600"
			class:cursor-pointer={grid.canGuess}
			onclick={() => grid.guess(position)}
		/>
	{/if}
</g>
