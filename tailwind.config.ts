import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        background: '#1A191D',
        'card-dark': '#1D1C20',
        'foreground-dark': '#727175',
      },
      boxShadow: {
        card: 'inset 0px 1px 0px 0px rgba(37,36,40,1), 0px 2px 2px rgba(0,0,0,0.2)',
        button: '0px 2px 2px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
};
export default config;
