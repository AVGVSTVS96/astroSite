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
					50: 'rgb(var(--accent-50) / <alpha-value>)',
					100: 'rgb(var(--accent-100) / <alpha-value>)',
					200: 'rgb(var(--accent-200) / <alpha-value>)',
					300: 'rgb(var(--accent-300) / <alpha-value>)',
					400: 'rgb(var(--accent-400) / <alpha-value>)',
					500: 'rgb(var(--accent-500) / <alpha-value>)',
					600: 'rgb(var(--accent-600) / <alpha-value>)',
					700: 'rgb(var(--accent-700) / <alpha-value>)',
					800: 'rgb(var(--accent-800) / <alpha-value>)',
					900: 'rgb(var(--accent-900) / <alpha-value>)',
					950: 'rgb(var(--accent-950) / <alpha-value>)',
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
				'muted': colors[primaryColor][400],
				'muted-dark': colors[primaryColor][500],
				dark: colors[primaryColor][900],
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography')
	],
}