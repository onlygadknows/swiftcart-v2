/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      colors: {
      primary: '#EEF0F2',
      secondary: '#EEC643',
      tertiary: '#000100',
      },
      fontFamily: {
        'poppins': ['Poppins',]
      }
    },
  },
  plugins: [],
}

