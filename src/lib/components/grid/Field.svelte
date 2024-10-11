<script lang="ts">
	import { getX, getY } from '$lib/utils/utils.ts';
	import { getContext } from 'svelte';

	const { xScale, yScale } = getContext('LayerCake');

	const grid = getContext('Grid');

	const { position = 0, fill = undefined } = $props();

	const step = $derived($xScale.step());
</script>

<g transform="translate({$xScale(getX(position))}, {$yScale(getY(position))})">
	{#if typeof fill !== 'undefined'}
		<circle cx={0} cy={0} r="10" />
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
