import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        foreground: 'hsl(var(--foreground))',
        'grayish-white': '#E4E4E5',
        'gray-jumbo': '#727274',
        background: '#1A191D',
        'card-dark': '#1D1C20',
        'foreground-dark': '#727175',
        'baltic-sea': '#27262B',
        'black-shark': '#1A1A1E',
        'tuna-778': '#38383C',
        alto: '#DADADA',
        nevada: '#6A6B6C',
        cherade: '#2D2C36',
        'cod-gray': '#0D0B0D',
        'heavy-metal': '#252625',
      },
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        card: 'inset 0px 1px 0px 0px rgba(37,36,40,1), 0px 2px 2px rgba(0,0,0,0.2)',
        button: '0px 2px 2px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
