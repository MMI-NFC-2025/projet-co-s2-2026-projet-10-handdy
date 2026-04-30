/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#FF6200',
      },
      boxShadow: {
        orange: '0 30px 90px rgba(255,98,0,0.16)',
      },
    },
  },
  plugins: [],
};
