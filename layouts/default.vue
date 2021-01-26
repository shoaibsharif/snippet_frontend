<template>
  <div>
    <nav class="flex items-center px-4 py-8 bg-white lg:py-0">
      <div class="flex flex-wrap items-center w-full conatiner lg:flex-nowrap">
        <nuxt-link class="mr-10" :to="{ name: 'index' }">
          Home
        </nuxt-link>
        <a
          href="#"
          class="ml-auto lg:hidden"
          @click.prevent="mobileNavOpen = !mobileNavOpen"
        >Open</a
        >

        <div class="flex w-full" :class="{ 'hidden lg:flex': !mobileNavOpen }">
          <ul class="items-center w-full lg:w-auto lg:h-24 lg:flex">
            <li>
              <nuxt-link
                class="text-lg text-gray-700 lg:px-4 lg:py-8"
                :to="{ name: 'index' }"
              >Browse
              </nuxt-link
              >
            </li>
            <li>
              <nuxt-link class="text-lg text-gray-700 " :to="{ name: 'index' }"
              >Search
              </nuxt-link
              >
            </li>
          </ul>

          <ul class="items-center ml-auto text-right lg:h-24 lg:flex">
            <template v-if="$auth.loggedIn">
              <li class="text-lg text-gray-700 lg:px-4 lg:py-8">{{ $auth.user.name }}</li>
              <li class="text-lg text-gray-700 lg:px-4 lg:py-8 cursor-pointer" @click.prevent="$auth.logout()">Logout
              </li>
            </template>
            <template v-if="!$auth.loggedIn">
              <li class="text-lg text-gray-700 lg:px-4 lg:py-8">
                <nuxt-link to="login">Sign in</nuxt-link>
              </li>
              <li class="text-lg text-gray-700 lg:px-4 lg:py-8">
                <nuxt-link to="register">Register</nuxt-link>
              </li>
            </template>

          </ul>
        </div>
      </div>
    </nav>
    <Nuxt/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      mobileNavOpen: false
    };
  },
  methods: {}
});
</script>

<style></style>
