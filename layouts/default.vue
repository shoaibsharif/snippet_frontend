<template>
  <div>
    <alert/>
    <nav class="flex items-center px-4 py-8 bg-white dark:bg-gray-900 lg:py-0">
      <div class="flex flex-wrap items-center w-full conatiner lg:flex-nowrap">
        <nuxt-link class="mr-10 dark:text-white" :to="{ name: 'index' }">
          Home
        </nuxt-link>


        <div class="flex w-full">
          <ul class="items-center w-full lg:w-auto lg:h-24 lg:flex">
            <li>
              <nuxt-link
                class="text-lg text-gray-700 dark:text-white lg:px-4 lg:py-8"
                :to="{ name: 'browse' }"
              >Browse
              </nuxt-link>
            </li>
            <li>
              <nuxt-link class="text-lg text-gray-700 dark:text-white" to="search" exact
              >Search
              </nuxt-link
              >
            </li>
          </ul>

          <ul class="items-center ml-auto text-right lg:h-24 lg:flex">
            <div class="flex items-center ml-auto">
              <button
                class="mr-2 dark:text-gray-200 rounded-full bg-gray-400 h-10 w-10 flex items-center justify-center dark:bg-gray-800 p-2"
                @click.prevent="changeColorMode">
                <transition name="colorMode">
                  <svg class=" h-5 w-5" v-if="$colorMode.value === 'dark'" xmlns="http://www.w3.org/2000/svg"
                       fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                </transition>
                <transition name="colorMode">
                  <svg v-if="$colorMode.value === 'light'" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                       fill="none"
                       viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                  </svg>
                </transition>
              </button>
              <a
                href="#"
                class="lg:hidden text-white dark:text-gray-900"
                @click.prevent="mobileNavOpen = !mobileNavOpen"
              >Open</a>
            </div>
            <template v-if="$auth.loggedIn">
              <li class="text-lg text-gray-700 dark:text-white lg:px-4 lg:py-8">{{ $auth.user.name }}</li>
              <li class="text-lg text-gray-700 dark:text-white lg:px-4 lg:py-8">
                <nuxt-link to="/dashboard" exact>Dashboard</nuxt-link>
              </li>

              <li class="text-lg text-gray-700 dark:text-white lg:px-4 lg:py-8 cursor-pointer" @click.prevent="logout">
                Logout
              </li>
            </template>
            <template v-if="!$auth.loggedIn">
              <li class="text-lg text-gray-700 dark:text-white lg:px-4 lg:py-8">
                <nuxt-link :to="{name: 'login'}">Sign in</nuxt-link>
              </li>
              <li class="text-lg text-gray-700 lg:px-4 lg:py-8 dark:text-white">
                <nuxt-link :to="{name: 'register'}">Register</nuxt-link>
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
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$store.commit('alert/SHOW_SUCCESS', 'logged out')
    },
    changeColorMode() {
      this.$colorMode.preference = this.$colorMode.value === 'light' ? 'dark' : 'light';
    }
  },

});
</script>

<style lang="scss">
.colorMode {
  &-enter {
    @apply transform opacity-0 translate-y-3/4;
    &-active {
      @apply transition ease-out duration-200;
    }

    &-to {
      @apply transform opacity-100 translate-y-0;
    }
  }

  &-leave {
    @apply transform opacity-100 translate-y-0;
    &-active {
      @apply transition ease-in duration-75;
    }

    &-to {
      @apply transform opacity-0 translate-y-3/4;
    }
  }

}
</style>

