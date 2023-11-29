/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#000',
        'white': '#fff',
        'green1':'#186E25',
        'error':'#F00000'
      },
      fontFamily: {
        fontFamily: ['Roboto', 'sans-serif']
      },
      backgroundImage:{
        'background-image':"url('./src/assets/images/bg.jpg')"
      }
    },
  },
  plugins: []
}

