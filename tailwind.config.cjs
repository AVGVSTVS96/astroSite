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

				// dark: {
				// 	text: colors.slate[200],
				// 	bg: colors.slate[950],

				// },

				// light: {
				// 	text: colors.slate[900],
				// 	bg: colors.slate[50],
				// }
			},

			textColor: {
				dark: colors.slate[200], // slate-200 = #d1d5db
				light: colors.slate[900], // slate-900 = #111827
			},

			backgroundColor: {
				dark: colors.slate[950], // slate-950 = #111827
				light: colors.slate[50], // slate-50 = #f9fafb
			},
		}
	},
	plugins: [
		require('@tailwindcss/typography')
	],
}