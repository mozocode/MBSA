/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#000000',
          dark: '#000000',
          light: '#1A1A2E',
        },
        gold: {
          DEFAULT: '#F4C430',
          dark: '#C49A0A',
          light: '#FAE07A',
        },
        cream: '#F5F0E8',
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        sans: ['Nunito Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
