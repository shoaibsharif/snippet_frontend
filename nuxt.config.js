export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s | Code snippets",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      {charset: "utf-8"},
      {name: "viewport", content: "width=device-width, initial-scale=1"},
      {hid: "description", name: "description", content: ""}
    ],
    link: [
      {rel: "icon", type: "image/x-icon", href: "/favicon.ico"},
      {rel: "preconnect", href: "https://fonts.gstatic.com"},
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode"
  ],

  colorMode: {
    // remove -mode suffix for Tailwind Dark mode support
    classSuffix: ""
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth-next"
  ],

  auth: {
    strategies: {
      laravelSanctum: {
        provider: "laravel/sanctum",
        url: process.env.API_URL,
        endpoints: {
          login: {
            url: "/api/auth/login"
          },
          logout: {
            url: "/api/auth/logout",
            method: "post"
          },
          user: {
            url: "/api/user",
            propertyName: false
          }
        }
      }
    },
    watchLoggedIn: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials: true,
    baseURL: process.env.API_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-instantsearch', 'instantsearch.js/es'],
  },

  server: {
    port: 3000,
    host: "snippet.test"
  },

};
