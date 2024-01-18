/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				mycustom: {
					100: '#15162e',
					200: '#191D2D'
				  },

				dark: {
					text: colors.slate[200],
					bg: colors.slate[950],
					
				},

				light: {
					text: colors.slate[900],
					bg: colors.slate[50],
				}
			},
		}
	},
	plugins: [
		require('@tailwindcss/typography')
	],
}