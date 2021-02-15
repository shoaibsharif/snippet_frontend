<template>
  <div class="mt-16 mx-8 md:mx-auto">
    <div class="flex flex-col items-center max-w-2xl mx-auto">
      <h1 class="text-3xl text-gray-700 dark:text-gray-200 font-medium mb-10">
        Register
      </h1>
      <form @submit.prevent="register"
            class="form">
        <text-field v-model="data.name" type="text" name="name" placeholder="John Doe" label="Name"
                    :error="errors && errors.name"/>
        <text-field v-model="data.username" type="text" name="username" placeholder="johndoe" label="Username"
                    :error="errors && errors.username"/>
        <text-field v-model="data.email" type="email" name="email" placeholder="m2@example.com" label="Email"
                    :error="errors && errors.email"/>
        <text-field v-model="data.password" type="password" name="password" placeholder="type your password"
                    label="Password"
                    :error="errors && errors.password"/>
        <text-field v-model="data.password_confirmation" type="password" name="password_confirmation"
                    placeholder="Confirm your password" label="Confirm Password"
                    :error="errors && errors.password_confirmation"/>

        <p class="text-gray-400 text-xs italic mb-6">* Password must be at least 8 character.</p>
        <nuxt-link to="/login" exact class="text-gray-400 text-md my-2 underline">Already have account?</nuxt-link>
        <button
          class="form-button--submit inline-flex h-10 items-center transition-all duration-300 relative"
          :class="[$auth.$state && $auth.$state.busy && $nuxt.$loading.$data.show && 'loader-button']"
          :disabled="$nuxt.$loading && $nuxt.$loading.$data && $nuxt.$loading.$data.show">

          <span>register</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  head: () => ({
    title: "Register"
  }),
  middleware: 'auth',
  auth: 'guest',
  data() {
    return {
      data: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        username: ""
      },
      errors: {}
    }
  },
  methods: {
    async register() {

      try {
        await this.$axios.$get("/sanctum/csrf-cookie")
        await this.$axios.post('/api/auth/register', {...this.data})
        await this.$router.push('/login')
        this.$store.commit('alert/SHOW_SUCCESS', "Registered successfully. Please login")
      } catch (e) {
        this.errors = e.response.data.errors
      }
      // this.$auth.loginWith()
    }
  }
})
</script>


