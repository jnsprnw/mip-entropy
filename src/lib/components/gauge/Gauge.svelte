<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	interface Props {
		value: number;
	}
	const { value }: Props = $props();

	const scale = scaleLinear().domain([0, 100]).range([10, 100]);
</script>

<div class="grid grid-rows-[1fr_auto] gap-y-2 py-2 w-full h-full justify-items-center">
	<span
		class="bg-entropy-bar h-full w-[5px] justify-self-center place-self-end col-start-1 col-end-2 row-start-1"
	></span>
	<span
		style="height: {scale(value)}%;"
		class="bg-highlight w-2/5 justify-self-center place-self-end col-start-1 col-end-2 row-start-1"
	></span>
	<span class="text-highlight font-semibold">Entropy</span>
</div>
