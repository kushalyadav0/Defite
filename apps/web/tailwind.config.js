/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Navy-tinted darks so every section matches the 3D hero in dark mode.
      colors: {
        gray: {
          700: '#272a48',
          800: '#11132a',
          900: '#0a0b1d',
        },
      },
    },
  },
  plugins: [],
};
