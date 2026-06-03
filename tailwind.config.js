/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#FF6200',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a360d',
          900: '#7c2d12',
        }
      },
      boxShadow: {
        orange: '0 30px 90px rgba(255,98,0,0.16)',
      },
    },
  },
  plugins: [],
};
