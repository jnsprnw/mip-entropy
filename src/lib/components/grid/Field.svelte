<script lang="ts">
	import { getX, getY } from '$lib/utils/utils.ts';
	import { getContext } from 'svelte';

	const { xScale, yScale } = getContext('LayerCake');

	const grid = getContext('Grid');

	const { position = 0, fill = undefined } = $props();

	const color = $derived.by(() => {
		if (grid.observer === 'bob') {
			return 'fill-black';
		}
		switch (fill?.color) {
			case 'blue':
				return 'fill-blue-500';
			case 'red':
				return 'fill-red-500';
			default:
				return undefined;
		}
	});

	const step = $derived($xScale.step());
</script>

<g transform="translate({$xScale(getX(position))}, {$yScale(getY(position))})">
	{#if typeof fill !== 'undefined'}
		{#if typeof fill === 'boolean'}
			<circle cx={0} cy={0} r="10" />
		{:else if grid.observer === 'alice'}
			<circle cx={0} cy={0} r="8" class="fill transition-colors {color}" />
		{:else if fill.figure === 'square'}
			<rect x={-8} y={-8} width="16" height="16" class="fill transition-colors {color}" />
		{:else if fill.figure === 'triangle'}
			<polygon points="-8,8 8,8 0,-8" class="fill transition-colors {color}" />
		{/if}
	{/if}
	{#if grid.mode === 'guess' && !grid.guesses[position]}
		<path
			d="M {-step / 2 + 0.5} {-step / 2 + 0.5} h {step - 1} v {step - 1} h {-step + 1} Z"
			class="fill fill-black transition-colors hover:fill-gray-500"
			class:cursor-pointer={grid.canGuess}
			onclick={() => grid.guess(position)}
		/>
	{/if}
</g>
