<template>
  <div>
    <div class="bg-white pb-6 mb-6">
      <div class="container ">
        <h1 class="text-4xl text-gray-700 font-medium leading-tight mb-4">Snippet title</h1>
        <div class="text-gray-600">@{{ $auth.user.name }}</div>
      </div>
    </div>

    <div class="container ">
      <h1 class="text-xl font-medium mb-6 text-gray-600 mb-6">1/1. Step title</h1>


      <div class="flex flex-wrap lg:flex-nowrap">
        <div class="w-full lg:w-8/12 mb-6 lg:mb-0 lg:mr-16 flex flex-wrap lg:flex-nowrap justify-between items-start">
          <nuxt-link to="" class="order-first bg-gradient-to-br from-purple-500 to-indigo-500 rounded p-3 mb-2 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
          </nuxt-link>
          <div class="p-8 rounded-lg text-gray-600 w-full bg-white">Markdown Content</div>
          <nuxt-link to=""
                     class="order-first lg:order-last bg-gradient-to-br from-purple-500 to-indigo-500 rounded p-3 mb-2 ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </nuxt-link>
        </div>
        <div class="w-full lg:w-4/12">

          <div class="mb-8">
            <h1 class="text-xl text-gray-600 font-medium mb-6"> Steps</h1>
            <ul>
              <li v-for="(step, index) in 5" :key="index">
                <nuxt-link to="" :class="{'font-bold': index === 1}">
                  {{ index + 1 }}. Step title
                </nuxt-link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  middleware: 'auth',
  head: () => ({
    title: "Snippet"
  })
})
</script>
