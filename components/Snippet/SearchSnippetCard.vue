<template>
  <div>
    <nuxt-link :to="`/snippets/${snippet.id}`"
               class="flex flex-wrap lg:flex-nowrap justify-between items-center bg-white rounded-lg p-8 w-full mb-2 cursor-pointer"
               :key="snippet.id">
      <div class="flex flex-col">

        <h3 class="text-xl leading-snug">
          <ais-highlight :hit="snippet" attribute="title"/>
        </h3>
        <p class="text-gray-400">{{ snippet.author.name }}</p>
      </div>

    </nuxt-link>
  </div>
</template>

<script>
import {AisHighlight} from "vue-instantsearch";

export default {
  components: {
    AisHighlight
  },
  props: {
    snippet: {
      required: true
    }
  },

}
</script>
