/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // On définit "orange" comme un objet de nuances
        orange: {
          500: '#FF6200',
          600: '#d65200', // Couleur un peu plus foncée pour le hover
        },
      },
      boxShadow: {
        orange: '0 30px 90px rgba(255,98,0,0.16)',
      },
    },
  },
  plugins: [],
};