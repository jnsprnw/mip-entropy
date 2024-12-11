/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Pangram', 'Avenir', 'Helvetica', 'sans-serif'],
			serif: ['Merriweather', 'Georgia', 'serif']
		},
		fontSize: {
			xs: '11px',
			sm: '13px',
			base: '16px',
			xl: '23px',
			'2xl': '26px'
		},
		extend: {
			screens: {
				xs: '440px',
				mobile: '544px',
				desktop: '920px'
			},
			colors: {
				bg: {
					bright: '#d5edf5',
					dark: '#b7e0ee'
				},
				primary: {
					dark: '#0080e9',
					light: '#00a1e9',
					mute: '#0b275b'
				},
				text: {
					DEFAULT: '#000'
				},
				accent: {
					dark: '#005CDE',
					light: '#00B2E2'
				},
				grid: {
					outer: '#4E63A9',
					inner: '#C3EBFA'
				},
				entity: {
					DEFAULT: '#F9922D',
					a: '#90B540', // green
					b: '#F9922D', // orange
					mute: '#D8C1DC'
				},
				highlight: {
					DEFAULT: '#dd5041',
					bob: '#862F8B'
				},
				entropy: {
					bar: '#C7DADF',
					text: '#818284'
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
