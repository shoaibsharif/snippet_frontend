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
        <nuxt-link to="/forgot-password" exact class="text-gray-400 text-md my-2 underline">Forgot your password?
        </nuxt-link>
        <nuxt-link to="/register" exact class="text-gray-400 text-md my-2 underline">Don't have account?
        </nuxt-link>
        <div class="flex items-center mb-4">
          <input type="checkbox" v-model="data.remember">
          <p class="ml-3">Remember me</p>
        </div>

        <button
          class="form-button--submit inline-flex h-10 items-center transition-all duration-300 relative"
          :class="[$nuxt.$loading && $nuxt.$loading.$data && $nuxt.$loading.$data.show && 'loader-button']"
          :disabled="$nuxt.$loading && $nuxt.$loading.$data && $nuxt.$loading.$data.show">

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
  middleware: ['auth'],
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
  },
  async asyncData(ctx) {
    try {
      const user = await ctx.app.$axios.get('/api/user')
      if (user) {
        ctx.app.$auth.$storage.setCookie('_token.laravelSanctum', true);
        ctx.app.$auth.fetchUser()
      }
    } catch (e) {
      console.log(e)
    }

  }
})
</script>


<style lang="scss">
.loader-button {
  @apply pl-10;
  &:before {
    @apply border-white border-2 left-3;
    position: absolute;
    width: 16px;
    height: 16px;
    margin-top: -8px;
    top: 50%;
    border-radius: 50%;
    border-bottom-color: transparent;
    animation: loading .5s linear infinite;
    content: "";
  }
}

@keyframes loading {
  100% {
    transform: rotate(360deg)
  }
}


</style>
