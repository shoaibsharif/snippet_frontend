<template>
  <div class="mt-16 mx-8 md:mx-auto">
    <div class="flex flex-col items-center">
      <h1 class="text-3xl text-gray-700 font-medium mb-10">
        Register
      </h1>
      <div
        class="bg-white shadow-md w-full md:w-6/12  rounded mx-auto px-8  pt-6 pb-8 mb-4 flex flex-col my-2">
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block capitalize tracking-wide text-grey-darker text-xs font-bold mb-2" for="name">
              Name
            </label>
            <input v-model.trim="data.name" :class="{'border-red-500' :  errors &&errors.name&& errors.name.length}"
                   class="appearance-none block w-full bg-grey-lighter text-gray-700 border rounded py-3 px-4"
                   name="name" id="name" type="text" placeholder="Jane Doe">
            <p class="text-red-500 text-xs italic" v-if="errors && errors.name&& errors.name.length">
              {{ errors.name && errors.name.join('') }}</p>
          </div>
          <div class="md:w-1/2 px-3">
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
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block capitalize tracking-wide text-grey-darker text-xs font-bold mb-2" for="password">
              password
            </label>
            <input v-model="data.password"
                   :class="{'border-red-500' : errors && errors.password && errors.password.length}"
                   class="appearance-none block w-full bg-grey-lighter text-gray-700 border rounded py-3 px-4 "
                   name="password" id="password" type="password" placeholder="type your password">
            <p class="text-red-500 text-xs italic" v-if="errors && errors.password && errors.password.length">
              {{ errors.password && errors.password.join('') }}</p>
          </div>
          <div class="md:w-1/2 px-3">
            <label class="block capitalize tracking-wide text-gray-700 text-xs font-bold mb-2" for="confirm_password">
              confirm password
            </label>
            <input v-model="data.password_confirmation"
                   :class="{'border-red-500' : errors && errors.password_confirmation && errors.password_confirmation.length}"
                   class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                   id="confirm_password" name="confirmPassword" type="password" placeholder="Confirm your password">
            <p class="text-red-500 text-xs italic"
               v-if="errors && errors.password_confirmation && errors.password_confirmation.length">
              {{ errors.name.join('') }}</p>
          </div>
        </div>
        <p class="text-gray-400 text-xs italic mb-6">* Password must be at least 8 character.</p>
        <button @click="register" class="capitalize rounded bg-yellow-600 px-3 py-3 w-1/2 mx-auto text-white">register
        </button>
      </div>
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
        password_confirmation: ""
      },
      errors: {}
    }
  },
  methods: {
    async register() {
      try {
        await this.$axios.get('sanctum/csrf-cookie');
        await this.$axios.post('/api/auth/register', {...this.data})
        await this.$auth.loginWith('laravelSanctum', {data: {email: this.data.email, password: this.data.password}})
      } catch (e) {
        this.errors = e.response.data.errors
      }
      // this.$auth.loginWith()
    }
  }
})
</script>
