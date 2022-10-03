/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/App.js",
    "./src/components/EditItem.js",
    "./src/components/EditList.js",
    "./src/components/NewList.js",
    "./src/components/NewItem.js"
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
