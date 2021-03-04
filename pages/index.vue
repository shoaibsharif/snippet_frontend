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
      <snippet-list :snippets="snippets" @onVisible="visibilityChanged"/>
    </div>
  </div>
</template>

<script>
import pagetransition from "~/mixins/pagetransition";

export default {
  head() {
    return {
      title: 'Home'
    }
  },

  data() {
    return {
      snippets: [],
      exampleUrl: process.env.NUXT_ENV_EXAMPLE_SNIPPET_URL,
      nextPage: null
    }
  },
  methods: {
    async visibilityChanged() {
      if (this.nextPage) {
        const snippets = await this.$axios.$get(this.nextPage);
        this.snippets.push(...snippets.data);
        this.nextPage = snippets?.links?.next;
      }
    }
  },
  mixins: [pagetransition],
  async asyncData(ctx) {
    const snippets = await ctx.app.$axios.$get('/api/snippets')
    return {
      snippets: snippets?.data,
      nextPage: snippets?.links?.next
    }
  }

};
</script>

