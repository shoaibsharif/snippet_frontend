<template>
  <div>
    <div class="bg-white dark:bg-gray-900 mb-16">
      <div class="container py-10 pb-16">
        <h1 class="text-4xl text-gray-700 dark:text-gray-400 font-medium leading-tight mb-4">Browse</h1>
      </div>
    </div>

    <div class="container">
      <h1 class="text-xl text-gray-600 dark:text-white font-medium mb-6">All snippet</h1>
      <snippet-list :snippets="snippets"/>
    </div>

  </div>
</template>


<script>
export default {
  head() {
    return {
      title: "Browse"
    }
  },
  data() {
    return {
      snippets: []
    }
  },
  async asyncData(ctx) {
    const snippets = await ctx.app.$axios.$get('/api/snippets')

    return {
      snippets: snippets.data
    }
  }
}
</script>
