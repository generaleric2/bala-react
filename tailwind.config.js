/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      textColor: {
        black: '#000',
        white: '#fff',
      },
    },
  },
  plugins: [],
}

