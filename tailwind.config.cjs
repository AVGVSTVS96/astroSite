/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				chocolate: {
					100: '#D2691E',
					200: '#CD661D',
				},
				brown: {
					100: '#804D3B',
					200: '#522E24'
				},
				blueish: {
					100: '#9AEDF4',
					200: '#75BEDA'
				},
			},
			plugins: [
				require('@tailwindcss/typography')
			],
		}
	}
}