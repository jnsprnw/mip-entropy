import adapter_auto from '@sveltejs/adapter-auto';
import adapter_netlify from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

console.log(`Using ${process.env.NETLIFY ? 'Netlify' : 'auto'} adapter`);
const adapter = process.env.NETLIFY ? adapter_netlify : adapter_auto;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$config: 'src/config.ts',
			$types: 'src/types.ts',
			$grid: 'src/lib/components/grid',
			$icons: 'src/lib/icons',
			$ui: 'src/lib/components/ui',
			$menu: 'src/lib/components/menu',
			$story: 'src/lib/components/story'
		}
	}
};

export default config;
