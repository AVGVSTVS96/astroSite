/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

const primaryColor = 'slate';

const mix = (name) =>
  `color-mix(in srgb, var(${name}), transparent calc(100% * (1 - <alpha-value>)))`;

module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-family)', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        '3xs': '380px',
        '2xs': '440px',
        xs: '520px',
        // shadcn
        '2xl': '1400px',
      },
      colors: {
        mycustom: {
          100: '#15162e',
          200: '#191D2D',
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
          950: colors[primaryColor][950],
          // shadcn
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        accent: {
          50: mix('--accent-50'),
          100: mix('--accent-100'),
          200: mix('--accent-200'),
          300: mix('--accent-300'),
          400: mix('--accent-400'),
          500: mix('--accent-500'),
          600: mix('--accent-600'),
          700: mix('--accent-700'),
          800: mix('--accent-800'),
          900: mix('--accent-900'),
          950: mix('--accent-950'),
          // shadcn
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        // shadcn
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      container: {
        center: true,
        padding: '2rem',
      },
      // original
      borderColor: {
        light: colors[primaryColor][200],
        base: colors[primaryColor][400],
        dark: colors[primaryColor][800],
      },
      textColor: {
        light: colors[primaryColor][50],
        'muted-light': colors[primaryColor][200],
        // muted: colors[primaryColor][400],
        'muted-dark': colors[primaryColor][500],
        dark: colors[primaryColor][900],
      },
      // shadcn
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
};
