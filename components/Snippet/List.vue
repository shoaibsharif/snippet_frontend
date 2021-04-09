<template>
  <div>
    <nuxt-link :to="`/snippets/${snippet.id}`"
               class="flex flex-wrap lg:flex-nowrap justify-between items-center shadow-md bg-white dark:bg-gray-700 rounded-lg p-8 w-full mb-2 cursor-pointer"
               v-for="snippet in snippets" :key="snippet.id">
      <div class="flex flex-col">

        <h3 class="text-xl dark:text-gray-400 leading-snug"> {{ snippet.title || "Untitled Snippet" }}</h3>
        <p class="text-gray-400">{{ snippet.author.name }}</p>
      </div>
      <div class="flex items-center">
        <p class="mr-2" v-if="showPublic">{{ snippet.is_public ? "Public" : null }}</p>
        <client-only>

          <nuxt-link
            class="p-2 text-blue-500 mr-2 lg:mr-0 hover:bg-gray-400 dark:hover:bg-gray-800 rounded-full transition ease-in-out duration-150"
            :to="{name: 'snippets-id-edit', params: {id: snippet.id}}" v-if="snippet.owner">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </nuxt-link>
          <a href="#"
             class="p-2 hover:bg-gray-400 dark:hover:bg-gray-800 rounded-full transition ease-in-out duration-150"
             @click.prevent="deleteSnippet(snippet)" v-if="snippet.owner">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-6 w-6 text-red-500"
                 viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </a>
        </client-only>
      </div>
    </nuxt-link>
    <div v-observe-visibility="visibilityChanged"></div>
  </div>
</template>

<script>
import modal from "@/mixins/modal";

export default {
  props: {
    snippets: {
      required: true
    },
    showPublic: Boolean
  },
  mixins: [modal],
  methods: {
    visibilityChanged(isVisible) {
      if (!isVisible) return
      this.$emit('onVisible', "just updated")
    },

    async deleteSnippet(snippet) {
      const confirm = await this.openModal()
      if (!confirm) return
      await this.$axios.$delete(`/api/snippets/${snippet.id}`);
      this.snippets = this.snippets.filter(s => s.id !== snippet.id);
    }
  }
}
</script>


