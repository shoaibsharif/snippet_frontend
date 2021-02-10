<template>
  <div>
    <div class="bg-white pb-6 mb-6">
      <div class="container ">
        <h1 class="text-4xl text-gray-700 font-medium leading-tight mb-4">{{ snippet.title }}</h1>
        <div class="text-gray-600">@{{ snippet.author.name }}</div>
      </div>
    </div>

    <div class="container ">
      <h1 class="text-xl font-medium mb-6 text-gray-600 m-3">{{ currentStepIndex + 1 }}/{{ steps.length }}.
        {{ currentStep.title }}</h1>


      <div class="flex flex-wrap lg:flex-nowrap">
        <div
          class="w-full lg:w-8/12 mb-6 lg:mb-0 lg:mr-16 flex flex-row-reverse lg:flex-row flex-wrap lg:flex-nowrap justify-between items-start">
          <step-navigation-button :step="previousStep">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
          </step-navigation-button>
          <div class="p-8 rounded-lg text-gray-600 w-full bg-white m-3 lg:mt-0">
            <step-markdown :value="currentStep.body"/>
          </div>

          <div class="flex flex-row-reverse lg:flex-col lg:mr-2 order-first lg:order-last">

            <step-navigation-button :step="nextStep">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </step-navigation-button>
            <nuxt-link v-if="snippet.owner" class="rounded bg-blue-500 p-3 text-white mr-2 lg:mr-0"
                       :to="{name: 'snippets-id-edit', params: {id: snippet.id}, query: {step: currentStep.id}}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </nuxt-link>
          </div>
        </div>
        <div class="w-full lg:w-4/12">

          <div class="mb-8">
            <h1 class="text-xl text-gray-600 font-medium mb-6"> Steps</h1>
            <step-list :steps="steps" :currentStep="currentStep"/>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import browseSnippet from "~/mixins/snippets/browseSnippet";

export default Vue.extend({

  head: () => ({
    title: "Snippet"
  }),
  data() {
    return {
      snippet: null,
      steps: []
    }
  },
  mixins: [browseSnippet],
  async asyncData(ctx) {
    try {

      const snippet = await ctx.app.$axios.$get(`/api/snippets/${ctx.params.id}`)
      return {
        snippet: snippet.data,
        steps: snippet.data.steps
      }
    } catch (e) {
      this.$store.commit("alert/SHOW_ERROR", e.response.data.message);
      ctx.redirect("/")
    }


  }
})
</script>
