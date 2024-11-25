<script lang="ts">
	import { getFill, getX, getY } from '$lib/utils/utils';
	import { fade } from 'svelte/transition';
	import { getContext } from 'svelte';
	import { MODE_GUESS } from '$config';
	import Square from '$lib/components/grid/shapes/Square.svelte';
	import Circle from '$lib/components/grid/shapes/Circle.svelte';
	import Triangle from '$lib/components/grid/shapes/Triangle.svelte';

	const { xScale, yScale } = getContext('LayerCake');

	import { getGridState } from './grid-state.svelte';
	const gridState = getGridState();
	const { grid, entity_size } = $derived(gridState);

	const { position = 0, opt = undefined } = $props();

	const color = $derived(getFill(grid.observer, opt?.color));

	const step = $derived($xScale.step());
	const xBandwidth = $derived($xScale.bandwidth() / 2);
	const yBandwidth = $derived($yScale.bandwidth() / 2);
</script>

<g
	style="transform: translate({$xScale(getX(position)) + xBandwidth}px, {$yScale(getY(position)) +
		yBandwidth}px);"
	class="transition-transform"
>
	{#if typeof opt !== 'undefined'}
		{#if typeof opt?.fill === 'boolean'}
			<circle cx={0} cy={0} r={entity_size / 2} class="fill-entity" />
		{:else if grid.observer === 'alice'}
			<Circle {color} isBlur={true} />
		{:else if opt.figure === 'square'}
			<Square {color} size={entity_size} />
		{:else if opt.figure === 'triangle'}
			<Triangle {color} size={entity_size} />
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
