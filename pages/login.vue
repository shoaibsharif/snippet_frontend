<template>
  <div class="container mt-16">
    <div class="flex flex-col items-center">
      <h1 class="text-3xl text-gray-700 font-medium mb-10">
        Sign in
      </h1>
      <form @submit.prevent="login"
            class="bg-white shadow-md w-full md:w-3/4 rounded mx-auto px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div class="-mx-3 md:flex mb-6">

          <div class="md:w-full px-3">
            <label class="block capitalize tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
              email
            </label>
            <input v-model="data.email" :class="{'border-red-500' : errors && errors.email && errors.email.length}"
                   class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                   id="email" name="email" type="email" placeholder="m2@example.com">
            <p class="text-red-500 text-xs italic" v-if="errors && errors.email && errors.email.length">
              {{ errors.email && errors.email.join('') }}</p>
          </div>
        </div>


        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-full px-3 mb-6 md:mb-0">
            <label class="block capitalize tracking-wide text-grey-darker text-xs font-bold mb-2" for="password">
              password
            </label>
            <input v-model="data.password"
                   :class="{'border-red-500' : errors && errors.password && errors.password.length}"
                   class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                   name="password" id="password" type="password" placeholder="type your password">
            <p class="text-red-500 text-xs italic" v-if="errors && errors.password && errors.password.length">
              {{ errors && errors.password && errors.password.join('') }}</p>
          </div>

        </div>
        <p class="text-gray-400 text-xs italic mb-6">* Password must be at least 8 character.</p>
        <div class="flex items-center mb-4">
          <input type="checkbox" v-model="data.remember">
          <p class="ml-3">Remember me</p>
        </div>

        <button class="capitalize rounded bg-yellow-600 px-3 py-3 w-1/2 mx-auto text-white">Log in</button>
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
  data() {
    return {
      data: {
        email: "shoaib@shoaib.com",
        password: "shoaib123",
        remember: false
      },
      errors: {}
    }
  },
  methods: {
    async login() {
      try {

        await this.$auth.loginWith('laravelSanctum', {data: this.data})
        await this.$router.push('/');
        this.$store.commit('alert/setAlert', {message: 'logged in', type: 'success'})
      } catch (e) {
        this.errors = e.response.data.errors
        this.$store.commit('alert/setAlert', {message: e.response.data.message, type: 'danger'})
      }

    }
  }
})
</script>
