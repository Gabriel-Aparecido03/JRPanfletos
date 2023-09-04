/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        main : ['Inter', 'sans-serif']
      },
      colors : {
        green : {
          50:"#edfff2",
          100:"#d6ffe3",
          200:"#afffc9",
          300:"#71ffa0",
          400:"#2dfb70",
          500:"#02e54d",
          600:"#00bf3b",
          700:"#009933",
          800:"#06752c",
          900:"#085f26",
          950:"#003613",
        },
        gray : {
          50:"#f6f6f6",
          100:"#e7e7e7",
          200:"#d1d1d1",
          300:"#b0b0b0",
          400:"#888888",
          500:"#777777",
          600:"#5d5d5d",
          700:"#4f4f4f",
          800:"#454545",
          900:"#3d3d3d",
          950:"#262626",
        },
        red : {
          50:"#fff1f2",
          100:"#ffdfe0",
          200:"#ffc5c7",
          300:"#ff9da1",
          400:"#ff656b",
          500:"#fe353d",
          600:"#ed1c24",
          700:"#c70e15",
          800:"#a41016",
          900:"#881418",
          950:"#4a0508",
        }
      }
    },
  },
  plugins: [],
}

