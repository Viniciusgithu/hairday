/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          light: '#DBC170',
          DEFAULT: '#B8952E',
          dark: '#846F2E'
        },
        gray: {
          100: '#F5F4F5',
          200: '#B2AFB6',
          300: '#98959D',
          400: '#7A767F',
          500: '#3E3C41',
          600: '#2E2C30',
          700: '#232225',
          800: '#19181B',
          900: '#050505',
        }
      },
      fontFamily: {
        sans: ['Catamaran', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
