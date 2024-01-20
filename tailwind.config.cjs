/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
const primaryColor = 'slate'
const accentColor = 'sky'

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
				primary: {
					50: colors[primaryColor][50],
					100: colors[primaryColor][100],
					200: colors[primaryColor][200],
					300: colors[primaryColor][300],
					400: colors[primaryColor][400],
					500: colors[primaryColor][500],
					600: colors[primaryColor][600],
					700: colors[primaryColor][700],
					800: colors[primaryColor][800],
					900: colors[primaryColor][900],
					950: colors[primaryColor][950]
				},
				accent: {
					50: colors[accentColor][50],
					100: colors[accentColor][100],
					200: colors[accentColor][200],
					300: colors[accentColor][300],
					400: colors[accentColor][400],
					500: colors[accentColor][500],
					600: colors[accentColor][600],
					700: colors[accentColor][700],
					800: colors[accentColor][800],
					900: colors[accentColor][900],
					950: colors[accentColor][950]
				},
			},

			borderColor: {
				light: colors[primaryColor][200],
				base: colors[primaryColor][400],
				dark: colors[primaryColor][800],
			},

			textColor: {
				light: colors[primaryColor][50],
				'muted-light': colors[primaryColor][200],
				'muted-base': colors[primaryColor][400],
				'muted-dark': colors[primaryColor][500],
				dark: colors[primaryColor][900],
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography')
	],
}