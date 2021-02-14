<template>
  <div>
    <div class="bg-white dark:bg-gray-900">

      <div class="container mb-16">
        <div class="flex py-16">
          <div class="w-full lg:w-6/12">
            <h1 class="text-5xl font-medium text-gray-700 dark:text-gray-400 leading-tight mb-6">Browse and create mini
              step-by-step
              tutorials</h1>

            <p class="text-xl text-gray-600 mb-12">
              Snippets are small collections of steps for things you don't need to remember.
            </p>
            <client-only>
              <nuxt-link class="rounded bg-indigo-500 dark:bg-indigo-700 px-3 py-3 text-white"
                         :to="{name: 'snippets-id', params: {id: exampleUrl}}">
                Checkout out an example &rarr;
              </nuxt-link>
            </client-only>
          </div>

        </div>

      </div>
    </div>
    <div class="container">
      <snippet-list :snippets="snippets"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Context} from "@nuxt/types/app";
import Vue from "vue";

export default Vue.extend({
  head() {
    return {
      title: 'Home'
    }
  },

  data: () => ({
    snippets: [],
    exampleUrl: process.env.NUXT_ENV_EXAMPLE_SNIPPET_URL
  }),

  async asyncData(ctx: Context): Promise<void | object> {
    const snippets = await ctx.app.$axios.$get('/api/snippets?limit=10')
    return {
      // @ts-ignore
      snippets: snippets?.data
    }
  }

});
</script>

