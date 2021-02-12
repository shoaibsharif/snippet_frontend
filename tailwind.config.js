const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}"
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {

    extend: {
      opacity: ['disabled'],
      fontFamily: {
        header: ["Rubik", "sans-serif"],
        fira: ["Fira Code", "monospace"],
        sans: ["Nunito", "sans-serif"]
      },
      colors: {
        gray: colors.blueGray,
        orange: colors.orange
      },
      container: {
        center: true,
      },
      boxShadow: ["dark"]
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
};
