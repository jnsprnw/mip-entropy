<script lang="ts">
	import Grid from '$lib/components/grid/Grid.svelte';
	import Observer from './Observer.svelte';
	import Gauge from './Gauge.svelte';
</script>

<main id="stage" class="p-4 grid items-center justify-items-center justify-center">
	<Observer />
	<Gauge />
	<div class="col-start-3 row-start-1 w-full h-full p-2">
		<Grid />
	</div>

	<footer class="col-start-1 col-span-5 row-start-2">Button</footer>
</main>

<style>
	#stage {
		grid-template-rows: 5fr 1fr;
		grid-template-columns: 2fr 1fr 3fr 1fr 2fr;
	}
</style>
