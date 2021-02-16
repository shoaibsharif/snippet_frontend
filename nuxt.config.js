export default {
  // Loading
  loading: {
    height: "5px",
    color: "#ea580c",
    continuous: true,
    duration: 1000
  },
  loadingIndicator: {
    name: 'cube-grid',
    color: '#5b21b6',
    background: '#c4b5fd'
  },

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
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;1,200;1,300;1,400&display=swap"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/css/main.scss"
  ],

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
    cookie: {
      options: {
        sameSite: 'lax',
      },
    },
    strategies: {
      laravelSanctum: {
        provider: "laravel/sanctum",
        url: process.env.NUXT_ENV_API_URL,
        endpoints: {
          login: {
            url: "/api/auth/login",
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
    watchLoggedIn: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials: true,
    baseURL: process.env.NUXT_ENV_API_URL,
    headers: {
      common: {
        'Accept': 'application/json'
      },
      post: {
        'Accept': 'application/json'
      }
    }
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vue-instantsearch", "instantsearch.js/es"]
  }
  ,
  privateRuntimeConfig: {
    AlgoliaAppId: process.env.ALGOLIA_APP_ID,
    AlgoliaSecretKey: process.env.ALGOLIA_API_KEY
  },
  env: {
    exampleSnippetUrl: process.env.NUXT_ENV_EXAMPLE_SNIPPET_URL
  },
  router: {
    parseQuery(queryString) {
      return require('qs').parse(queryString);
    },
    stringifyQuery(object) {
      var queryString = require('qs').stringify(object);
      return queryString ? '?' + queryString : '';
    },
  },
};
