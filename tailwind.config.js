const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {

    extend: {
      fontFamily: {
        header: ["Rubik", "sans-serif"],
        fira: ["Fira Code", "monospace"]
      },
      colors: {
        gray: colors.blueGray,
        orange: colors.orange
      },
      container: {
        center: true,
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
};
