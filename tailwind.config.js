const colors = require('tailwindcss/colors')
const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
const em = (px, base) => `${round(px / base)}em`
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
      typography: (theme) => ({
        dark: {
          css: {
            color: '#fff',
            h1: {
              color: theme('colors.gray.200'),
              fontSize: em(30, 14),
            }, h2: {
              color: theme('colors.gray.200'),
              fontSize: em(20, 14),
            }, h3: {
              color: theme('colors.gray.200'),
              fontSize: em(18, 14),
            }, h4: {
              color: theme('colors.gray.200'),
              fontSize: em(20, 14),
            },
          }
        }
      }),
      opacity: ['disabled'],
      fontFamily: {
        header: ["Rubik", "sans-serif"],
        fira: ["Fira Code", "monospace"],
        sans: ["Nunito", "sans-serif"]
      },
      colors: {
        gray: colors.blueGray,
        orange: colors.orange,
        amber: colors.amber,
        violate: colors.violet
      },
      container: {
        center: true,
      },
      boxShadow: ["dark"],
    }
  },
  variants: {
    extend: {
      typography: ['dark']
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
};
