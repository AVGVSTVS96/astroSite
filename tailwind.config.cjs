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
				'light-slate': colors.slate[200], // slate-200 = #d1d5db
				'dark-slate': colors.slate[800], // slate-800 = #3e4c59
				'accent-light': colors.sky[50], // sky-50 = #eff6ff
				'accent-highlight': colors.sky[300], // sky-300 = #93c5fd
				'accent-dark': colors.sky[500], // sky-500 = #3b82f6
			},

			borderColor: {
				// Used in BlogIndex.astro, Footer.astro, NavBar.astro
				slate: {
					DEFAULT: colors.slate[400], // slate-400 = #64748b
				},
				light: colors.slate[200], // slate-200 = #d1d5db
				// Used in Projects.astro for tag borders and MDLayout, Card for HR
				'light-accent': colors.sky[200], // sky-200 = #bae6fd
				accent: colors.sky[400], // sky-400 = #60a5fa
				'dark-accent': colors.sky[500], // sky-500 = #3b82f6
			},
		}
	},
	plugins: [
		require('@tailwindcss/typography')
	],
}