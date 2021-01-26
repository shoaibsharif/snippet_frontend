<template>
  <div>
    <div class="bg-white pb-6 mb-6">
      <div class="container ">
        <input type="text"
               class="rounded border-2 p-2 w-full md:w-3/4 border-dashed text-4xl font-header focus:outline-none"
               placeholder="Untitled snippet">
        <div class="text-gray-600">@{{ $auth.user.name }}</div>
      </div>
    </div>

    <div class="container ">
      <div class="flex items-center mb-6">
        <div class="text-xl font-medium  text-gray-600">1/1</div>

        <input type="text" class="text-xl rounded border-2 border-dashed px-2 py-1" placeholder="Untitled Snippet">
      </div>


      <div class="flex flex-wrap lg:flex-nowrap">
        <div class="w-full lg:w-8/12 mb-6 lg:mb-0 lg:mr-16 flex flex-wrap lg:flex-nowrap justify-between items-start">
          <div class="order-first flex flex-row lg:flex-col mr-2">

            <nuxt-link title="Previous Step" to=""
                       class=" bg-gradient-to-br from-purple-500 to-indigo-500 rounded mb-2 mr-2 lg:mr-0 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
            </nuxt-link>
            <nuxt-link to="" title="Add Step" class="bg-green-300 rounded p-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-6 w-6 text-green-700" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </nuxt-link>
          </div>


          <textarea class="rounded-lg w-full bg-white border-2 border-dashed">Editor</textarea>
          <div class="flex order-first flex-row-reverse lg:flex-col lg:order-last">
            <nuxt-link to="" title="Next Step"
                       class=" bg-gradient-to-br from-purple-500 to-indigo-500 rounded p-3 mb-2 ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="fill-current h-6 w-6 text-white" fill="none"
                   viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </nuxt-link>

            <nuxt-link to="" title="Add Step" class="bg-green-300 rounded p-3 mb-2 ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-6 w-6 text-green-700" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </nuxt-link>

            <nuxt-link to="" title="delete step"
                       class="bg-red-300 rounded p-3 mb-2 ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-6 w-6 text-red-500"
                   viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </nuxt-link>
          </div>
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
    title: "Edit"
  })
})
</script>
