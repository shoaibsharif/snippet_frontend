<template>
  <ais-instant-search-ssr>
    <div class="bg-white dark:bg-gray-900 mb-16">
      <div class="container py-10 pb-16">
        <h1 class="text-4xl text-gray-700 dark:text-gray-200 font-medium leading-tight mb-4">Search</h1>
        <ais-search-box autofocus :show-loading-indicator="true"/>
        <ais-configure :hits-per-page.camel="10"/>
        <div class="flex justify-between items-center mt-2 mx-3">
          <ais-stats class="dark:text-gray-200"/>
          <client-only>
            <ais-powered-by/>
          </client-only>
        </div>
      </div>
    </div>
    <div class="container">
      <h1 class="text-xl text-gray-600 font-medium mb-6 dark:text-gray-200">All snippet</h1>


      <!--      <ais-hits>-->
      <!--        <template-->
      <!--          slot="item"-->
      <!--          slot-scope="{ item }">-->
      <!--          <search-snippet-card :snippet="item"/>-->
      <!--        </template>-->
      <!--      </ais-hits>-->
      <ais-infinite-hits>
        <template slot-scope="{items, refineNext, isLastPage}">

          <transition-group name="stagger" v-on:enter="enter" v-on:leave="leave"
                            :css="false"
                            tag="ul"
          >
            <li class="mb-2" v-for="(item, index) in items" :key="item.objectID" v-bind:data-index="index">
              <snippet-search-card :snippet="item"/>
            </li>
          </transition-group>
          <div class="flex items-center justify-center">

            <button v-if="!isLastPage" class="my-5 rounded px-3 py-2 bg-purple-500 text-white" @click="refineNext">Show
              more
            </button>
          </div>
        </template>
      </ais-infinite-hits>
      <!--      <ais-pagination/>-->
    </div>
  </ais-instant-search-ssr>
</template>


<script>

import anime from 'animejs/lib/anime.es'
import algolia from "@/mixins/snippets/algolia";


export default {
  mixins: [algolia],
  methods: {

    enter(el, done) {
      // let delay = el.dataset.index * 150;
      let height = el.getBoundingClientRect().height
      anime({
        targets: el,
        translateX: [-400, 0],
        height: [0, height],
        opacity: [0, 1],
        complete: done,
        delay: anime.stagger(100),
        easing: 'easeInOutQuad'
      })
    },
    leave(el, done) {
      // let delay = el.dataset.index * 100;
      anime({
        targets: el,
        translateX: 270,
        opacity: [1, 0],
        height: 0,
        complete: done,
        delay: anime.stagger(100),
        easing: 'easeInOutQuad'
      })
    }
  },

}
</script>
<style lang="scss">


.ais-SearchBox {
  &-form {
    @apply flex w-full;
  }

  &-input {
    @apply transition duration-150 ease-in-out rounded-full focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 bg-gray-200 dark:bg-gray-800 dark:text-gray-200 font-sans px-3 py-2 focus:outline-none appearance-none w-full;
  }

  &-submit {
    @apply hidden;
    svg {
      @apply h-6 w-6;
    }
  }

  &-reset {
    @apply hidden;
  }
}

.ais-Pagination {
  @apply flex w-full mt-6;
  &-list {
    @apply flex mx-auto;
  }

  &-link {
    @apply p-3;
  }

  &-item {
    @apply rounded shadow-md m-3 h-10 w-10 flex items-center justify-center bg-gradient-to-t from-purple-100 to-gray-100 dark:from-gray-700 dark:to-gray-700 dark:text-white;
    &--selected {
      @apply bg-gradient-to-t from-purple-500 to-purple-700 dark:from-purple-500 dark:to-purple-700;
      .ais-Pagination-link {
        @apply text-white;
      }
    }

  }

}

</style>
