/* eslint-disable no-undef */
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
        'black1':'#C7C9CA',
        'black2':'#536471',
        'black3':'#8E99A1',
        'white': '#fff',
        'white1':'#EFF3F4',
        'green1':'#186E25',
        'green2':'#1d9bf0',
        'error':'#F00000'
        
      },
      fontFamily: {
        fontFamily: ['Roboto', 'sans-serif']
      },
      backgroundImage:{
        'background-image':"url('./src/assets/images/bg.jpg')"
      },
      ringWidth: ['focus-visible'],
      ringColor: ['focus-visible'],
      borderColor: ['focus-visible'],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ]
}

