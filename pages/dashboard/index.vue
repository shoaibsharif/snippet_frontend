<template>
  <div class="container mt-16">
    <div class="flex justify-between mb-4">
      <h1 class="text-xl text-gray-600 font-medium mb-6">Your snippet ({{ snippets.length }})</h1>
      <button @click="createSnippet" class="rounded text-gray-900 px-3 py-4 bg-indigo-500 dark:bg-indigo-700 ">+ Create
        a snippet
      </button>
    </div>
    <snippet-list :snippets="snippets" showPublic/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Context} from "@nuxt/types";

export default Vue.extend({
  head() {
    return {
      title: "Dashboard"
    }
  },
  data() {
    return {
      snippets: []
    }
  },
  async asyncData(ctx: Context) {
    const snippets = await ctx.$axios.$get("/api/me/snippets")
    return {
      snippets: snippets.data
    }
  },
  methods: {
    async createSnippet() {
      const snippet = await this.$axios.$post('/api/snippets')
      await this.$router.push(`/snippets/${snippet.id}/edit`)
    },

  }
})
</script>
