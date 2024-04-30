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
      },
      backgroundColor: {
        productCard: '#fff',
      },
      width:{
        '200':  '100%',
        '600': '300px'
      },
      height:{
        '200':'100%',
        '600':'400px'
      }
    },
  },
  plugins: [],
}
