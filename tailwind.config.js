/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				bg: {
					bright: '#D5EDF5',
					dark: '#CBE8EF'
				},
				accent: {
					dark: '#005CDE',
					light: '#00B2E2'
				},
				grid: {
					outer: '#4E63A9',
					inner: '#C3EBFA'
				},
				bar: {
					line: '#B2E2EA',
					bar: '#E5322E'
				}
			}
		}
	},
	plugins: []
};
