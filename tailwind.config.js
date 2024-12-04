/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			blur: {
				xs: '2px'
			},
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
				},
				entity: {
					DEFAULT: '#F9922D',
					a: '#90B540', // green
					b: '#F9922D', // orange
					mute: '#B3DCE2'
				},
				highlight: {
					DEFAULT: '#E5322E'
				},
				entropy: {
					bar: '#90CEDD'
				},
				button: {
					secondary: '#00B2E2',
					primary: '#005CDE',
					mute: '#BFDBF5'
				},
				wall: {
					DEFAULT: '#6078BA',
					cord: '#E5322E'
				}
			}
		}
	},
	plugins: []
};
