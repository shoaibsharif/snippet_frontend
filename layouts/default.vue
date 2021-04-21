<template>
  <div class="flex h-full flex-col">
    <alert/>
    <nav class="flex items-center px-4 py-8 bg-white dark:bg-gray-900 lg:py-0">

      <div class="flex justify-between w-full container items-center">
        <nuxt-link class="mr-10 dark:text-white" :to="{ name: 'index' }">
          Home
        </nuxt-link>
        <ul class="items-center lg:w-auto lg:h-24 flex">
          <li class="mr-2">
            <nuxt-link
              class="navigation-link"
              :to="{ name: 'browse' }"
            >Browse
            </nuxt-link>
          </li>
          <li class="navigation-link">
            <nuxt-link to="/search" exact
            >Search
            </nuxt-link
            >
          </li>
        </ul>

        <div class="items-center ml-auto lg:h-24 flex">
          <div class="flex items-center ml-auto">
            <button
              class="mr-2 dark:text-gray-200 focus:outline-none rounded-full bg-gray-400 dark:bg-gray-800 h-10 w-10 flex items-center justify-center  p-2"
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
            <template v-if="$auth.loggedIn">
              <div class="relative" v-clickaway="closeDropdown">
                <a href="#" class="navigation-link"
                   @click.prevent="dropdownNav = !dropdownNav">{{ $auth.user.name }}</a>
                <transition name="nav">
                  <div v-if="dropdownNav" @click.capture="dropdownTR"
                       class="absolute z-50 mt-2 w-40 pb-1 border dark:border-gray-600 border-gray-200 rounded-md bg-white dark:bg-gray-600 shadow-lg origin-top-right right-0 top-10">
                    <div class="block px-4 py-2 text-xs text-gray-400">Manage Account</div>
                    <a href="#" class="nav-dropdown--link" @click.prevent="createSnippet">Create a snippet</a>
                    <nuxt-link :to="{name: 'user-profile'}"
                               class="nav-dropdown--link">
                      Profile
                    </nuxt-link>
                    <nuxt-link class="nav-dropdown--link" to="/dashboard" exact>
                      Dashboard
                    </nuxt-link>
                    <a href="#" class="nav-dropdown--link" @click.prevent="logout">Logout</a>
                  </div>
                </transition>
              </div>
            </template>
            <template v-if="!$auth.loggedIn">
              <nuxt-link class="navigation-link" :to="{name: 'login'}">Sign in</nuxt-link>
              <!--                <nuxt-link class="navigation-link" :to="{name: 'register'}">Register</nuxt-link>-->
            </template>
          </div>
        </div>
      </div>

    </nav>
    <div class="h-full">
      <Nuxt/>
    </div>

    <footer class="mt-24 mb-5 container flex justify-center items-center">

      <p>
        &copy; Shoaib Sharif {{ new Date().getFullYear() }}
      </p>

    </footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

Vue.directive('clickaway', {
  bind(el, {value}) {
    if (typeof value !== 'function') {
      console.warn(`Expect a function, got ${value}`)
      return
    }
    // @ts-ignore
    document.addEventListener('click', (e) => el.contains(e.target) || value())
  }
})

export default Vue.extend({
  data() {
    return {
      dropdownNav: false
    };
  },
  methods: {
    async createSnippet() {
      const snippet = await this.$axios.$post('/api/snippets')
      await this.$router.push(`/snippets/${snippet.id}/edit`)
    },
    async logout() {
      this.dropdownNav = false;
      await this.$auth.logout();
      this.$store.commit('alert/SHOW_SUCCESS', 'logged out')
    },
    changeColorMode() {
      this.$colorMode.preference = this.$colorMode.value === 'light' ? 'dark' : 'light';
    },
    closeDropdown() {
      this.dropdownNav = false
    },
    dropdownTR(e: any) {
      this.dropdownNav = false
    }
  },

});
</script>

<style lang="scss">
html, body, #__nuxt, #__layout {
  height: 100%;
  --tw-bg-opacity: 1;
  scrollbar-color: rgba(51, 65, 85, var(--tw-bg-opacity)) transparent;
  scrollbar-width: thin;
}

@media (orientation: landscape) {
  ::-webkit-scrollbar-track {
    border-radius: 3px;
    background-color: transparent;
  }
  ::-webkit-scrollbar {
    @apply w-[5px] h-[11px] bg-transparent;
  }
  ::-webkit-scrollbar-thumb {
    @apply bg-gray-700 border-2 border-gray-800 rounded;
  }
}

//::selection {
//  @apply bg-gray-600;
//}

.navigation-link {
  @apply capitalize text-lg text-gray-700 dark:text-white lg:px-4 lg:py-8;
}

.nav-dropdown {
  &--link {
    @apply block px-4 py-2 text-sm leading-5 text-gray-700 dark:text-white dark:hover:text-gray-800 hover:bg-purple-300 focus:outline-none transition duration-150 ease-in-out;

  }
}

.nav {
  &-enter {
    @apply transform opacity-0 scale-95;
    &-active {
      @apply transition ease-out duration-200;
    }

    &-to {
      @apply transform opacity-100 scale-100;
    }
  }

  &-leave {
    @apply transform opacity-100 scale-100;
    &-active {
      @apply transition ease-in duration-75;
    }

    &-to {
      @apply transform opacity-0 scale-95;
    }
  }

}

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

