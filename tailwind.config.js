/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#03A6A1',
          50: '#E6F7F6',
          100: '#CCF0EE',
          200: '#99E0DC',
          300: '#66D1CB',
          400: '#33C1B9',
          500: '#03A6A1',
          600: '#028480',
          700: '#026360',
          800: '#014240',
          900: '#012120'
        },
        secondary: {
          DEFAULT: '#FFE3BB',
          50: '#FFFCF7',
          100: '#FFF8ED',
          200: '#FFF0D4',
          300: '#FFE9BB',
          400: '#FFE6A2',
          500: '#FFE3BB',
          600: '#FFD689',
          700: '#FFC857',
          800: '#FFBB25',
          900: '#E6A000'
        },
        accent: {
          DEFAULT: '#FFA673',
          50: '#FFF4ED',
          100: '#FFE9DB',
          200: '#FFD3B7',
          300: '#FFBD93',
          400: '#FFB26F',
          500: '#FFA673',
          600: '#FF8B3D',
          700: '#FF7007',
          800: '#D15500',
          900: '#9D4000'
        },
        error: {
          DEFAULT: '#FF4F0F',
          50: '#FFE5D9',
          100: '#FFCCB3',
          200: '#FF9966',
          300: '#FF7733',
          400: '#FF6619',
          500: '#FF4F0F',
          600: '#E6460E',
          700: '#CC3D0C',
          800: '#B3340A',
          900: '#992B08'
        },
        success: {
          DEFAULT: '#03A6A1',
          50: '#E6F7F6',
          100: '#CCF0EE',
          200: '#99E0DC',
          300: '#66D1CB',
          400: '#33C1B9',
          500: '#03A6A1',
          600: '#028480',
          700: '#026360',
          800: '#014240',
          900: '#012120'
        }
      }
    },
  },
  plugins: [],
}