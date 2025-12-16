/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 1. Set 'gray' to be the neutral scale (pure gray, no blue tint)
        gray: colors.neutral,
        
        // 2. FORCE gray-900 and gray-950 to be True Black
        // This turns your Login/Register backgrounds into Pitch Black
        gray: {
          ...colors.neutral,
          900: '#000000', 
          950: '#000000',
        },
      },
    },
  },
  plugins: [],
}