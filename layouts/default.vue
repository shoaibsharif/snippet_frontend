<template>
  <div class="flex h-full flex-col">
    <alert/>
    <nav class="flex items-center px-4 py-8 bg-white dark:bg-gray-900 lg:py-0">

      <div class="flex justify-between w-full container items-center">
        <nuxt-link class=" dark:text-white" :to="{ name: 'index' }">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
        </nuxt-link>
        <ul class="items-center lg:w-auto lg:h-24 flex">
          <li class="mr-2">
            <nuxt-link
              class="navigation-link"
              :to="{ name: 'browse' }"
            >Browse
            </nuxt-link>
          </li>
        </ul>

        <div class="items-center ml-auto lg:h-24 flex">
          <a href="https://github.com/shoaibsharif/snippet_frontend" target="_blank">
            <svg class="h-6 w-6 fill-current text-black dark:text-white" viewBox="0 0 256 250"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
              <g>
                <path
                  d="M128.00106,0 C57.3172926,0 0,57.3066942 0,128.00106 C0,184.555281 36.6761997,232.535542 87.534937,249.460899 C93.9320223,250.645779 96.280588,246.684165 96.280588,243.303333 C96.280588,240.251045 96.1618878,230.167899 96.106777,219.472176 C60.4967585,227.215235 52.9826207,204.369712 52.9826207,204.369712 C47.1599584,189.574598 38.770408,185.640538 38.770408,185.640538 C27.1568785,177.696113 39.6458206,177.859325 39.6458206,177.859325 C52.4993419,178.762293 59.267365,191.04987 59.267365,191.04987 C70.6837675,210.618423 89.2115753,204.961093 96.5158685,201.690482 C97.6647155,193.417512 100.981959,187.77078 104.642583,184.574357 C76.211799,181.33766 46.324819,170.362144 46.324819,121.315702 C46.324819,107.340889 51.3250588,95.9223682 59.5132437,86.9583937 C58.1842268,83.7344152 53.8029229,70.715562 60.7532354,53.0843636 C60.7532354,53.0843636 71.5019501,49.6441813 95.9626412,66.2049595 C106.172967,63.368876 117.123047,61.9465949 128.00106,61.8978432 C138.879073,61.9465949 149.837632,63.368876 160.067033,66.2049595 C184.49805,49.6441813 195.231926,53.0843636 195.231926,53.0843636 C202.199197,70.715562 197.815773,83.7344152 196.486756,86.9583937 C204.694018,95.9223682 209.660343,107.340889 209.660343,121.315702 C209.660343,170.478725 179.716133,181.303747 151.213281,184.472614 C155.80443,188.444828 159.895342,196.234518 159.895342,208.176593 C159.895342,225.303317 159.746968,239.087361 159.746968,243.303333 C159.746968,246.709601 162.05102,250.70089 168.53925,249.443941 C219.370432,232.499507 256,184.536204 256,128.00106 C256,57.3066942 198.691187,0 128.00106,0 Z M47.9405593,182.340212 C47.6586465,182.976105 46.6581745,183.166873 45.7467277,182.730227 C44.8183235,182.312656 44.2968914,181.445722 44.5978808,180.80771 C44.8734344,180.152739 45.876026,179.97045 46.8023103,180.409216 C47.7328342,180.826786 48.2627451,181.702199 47.9405593,182.340212 Z M54.2367892,187.958254 C53.6263318,188.524199 52.4329723,188.261363 51.6232682,187.366874 C50.7860088,186.474504 50.6291553,185.281144 51.2480912,184.70672 C51.8776254,184.140775 53.0349512,184.405731 53.8743302,185.298101 C54.7115892,186.201069 54.8748019,187.38595 54.2367892,187.958254 Z M58.5562413,195.146347 C57.7719732,195.691096 56.4895886,195.180261 55.6968417,194.042013 C54.9125733,192.903764 54.9125733,191.538713 55.713799,190.991845 C56.5086651,190.444977 57.7719732,190.936735 58.5753181,192.066505 C59.3574669,193.22383 59.3574669,194.58888 58.5562413,195.146347 Z M65.8613592,203.471174 C65.1597571,204.244846 63.6654083,204.03712 62.5716717,202.981538 C61.4524999,201.94927 61.1409122,200.484596 61.8446341,199.710926 C62.5547146,198.935137 64.0575422,199.15346 65.1597571,200.200564 C66.2704506,201.230712 66.6095936,202.705984 65.8613592,203.471174 Z M75.3025151,206.281542 C74.9930474,207.284134 73.553809,207.739857 72.1039724,207.313809 C70.6562556,206.875043 69.7087748,205.700761 70.0012857,204.687571 C70.302275,203.678621 71.7478721,203.20382 73.2083069,203.659543 C74.6539041,204.09619 75.6035048,205.261994 75.3025151,206.281542 Z M86.046947,207.473627 C86.0829806,208.529209 84.8535871,209.404622 83.3316829,209.4237 C81.8013,209.457614 80.563428,208.603398 80.5464708,207.564772 C80.5464708,206.498591 81.7483088,205.631657 83.2786917,205.606221 C84.8005962,205.576546 86.046947,206.424403 86.046947,207.473627 Z M96.6021471,207.069023 C96.7844366,208.099171 95.7267341,209.156872 94.215428,209.438785 C92.7295577,209.710099 91.3539086,209.074206 91.1652603,208.052538 C90.9808515,206.996955 92.0576306,205.939253 93.5413813,205.66582 C95.054807,205.402984 96.4092596,206.021919 96.6021471,207.069023 Z"
                  fill="currentColor"></path>
              </g>
            </svg>
          </a>
          <div class="flex items-center ml-auto">
            <nuxt-link class="mr-5 navigation-link" to="/search" exact
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </nuxt-link
            >
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
                      My Snippets
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
    <Nuxt/>
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
  @apply capitalize text-lg text-gray-700 dark:text-white ml-5;
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

