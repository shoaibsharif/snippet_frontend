<template>
  <div class="container mt-16">
    <div class="flex justify-between mb-4">
      <h1 class="text-xl text-gray-600 font-medium mb-6">Your snippet ({{ snippets.length }})</h1>
      <button @click="createSnippet" class="rounded text-gray-900 px-3 py-4 bg-indigo-500 dark:bg-indigo-700 ">+ Create
        a snippet
      </button>
    </div>
    <snippet-list :snippets="snippets" showPublic @onVisible="visibilityChanged"/>
  </div>
</template>

<script>

export default {
  head() {
    return {
      title: "Dashboard"
    }
  },
  data() {
    return {
      snippets: [],
      nextPage: null
    }
  },
  async asyncData(ctx) {
    const snippets = await ctx.$axios.$get("/api/me/snippets")
    return {
      snippets: snippets.data,
      nextPage: snippets?.links?.next
    }
  },
  methods: {
    async visibilityChanged() {
      if (this.nextPage) {
        const snippets = await this.$axios.$get(this.nextPage);
        this.snippets.push(...snippets.data);
        this.nextPage = snippets?.links?.next;
      }
    },
    async createSnippet() {
      const snippet = await this.$axios.$post('/api/snippets')
      await this.$router.push(`/snippets/${snippet.id}/edit`)
    },

  }
}
</script>
