<template>
  <div class="container mt-16">
    <div class="flex flex-col items-center max-w-2xl mx-auto">
      <h1 class="text-3xl text-gray-700 dark:text-gray-200 font-medium mb-10">
        Sign in
      </h1>
      <form @submit.prevent="login"
            class="form">

        <text-field v-model="data.email" type="email" name="email" placeholder="m2@example.com" label="Email"
                    :error="errors && errors.email"/>
        <text-field v-model="data.password" type="password" name="password" placeholder="type your password"
                    label="Password"
                    :error="errors && errors.password"/>
        <p class="text-gray-400 text-xs italic mb-6">* Password must be at least 8 character.</p>
        <nuxt-link to="/forgot-password" class="text-gray-400 text-md my-2 underline">Forgot password</nuxt-link>
        <div class="flex items-center mb-4">
          <input type="checkbox" v-model="data.remember">
          <p class="ml-3">Remember me</p>
        </div>

        <button
          class="form-button--submit inline-flex h-10 items-center"
          :class="[$nuxt.$loading && $nuxt.$loading.$data && $nuxt.$loading.$data.show && 'loader-button']"
          :disabled="$nuxt.$loading && $nuxt.$loading.$data && $nuxt.$loading.$data.show">
          <transition name="animate-loader">

            <svg
              v-show="$nuxt.$loading && $nuxt.$loading.$data && $nuxt.$loading.$data.show"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </transition>

          <span>login</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">


import Vue from "vue";

export default Vue.extend({

  head() {
    return {
      title: 'Sign In'
    }
  },
  middleware: 'auth',
  auth: 'guest',
  mounted() {
    if (this.$route.query?.verified === '1') {
      this.$store.commit('alert/SHOW_SUCCESS', "Email verified. Please login.")
    }
  },
  data() {
    return {
      data: {
        email: "",
        password: "",
        remember: false
      },
      errors: {}
    }
  },
  methods: {
    async login() {
      try {
        this.$nuxt.$loading.start();
        await this.$auth.loginWith('laravelSanctum', {data: this.data})
        await this.$router.push('/');
        this.$store.commit('alert/SHOW_SUCCESS', "Successfully logged in")
      } catch (e) {
        this.errors = e.response.data.errors
        this.$store.commit("alert/SHOW_ERROR", e.response.data.message);
      }

    }
  }
})
</script>


<style lang="scss">
.animate-loader {

  &-enter, &-leave-active {
    @apply transition-all duration-150;
  }

  &-enter, &-leave-to {
    @apply opacity-0;
  }
}

</style>
