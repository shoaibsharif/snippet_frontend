<template>
  <div>
    <div class="bg-white dark:bg-gray-900 pb-6 mb-6">
      <div class="container">
        <input type="text"
               class="rounded border-2 dark:text-white p-2 font-sans w-full md:w-3/4 border-dashed dark:border-gray-300 dark:bg-gray-800 text-4xl font-header focus:outline-none"
               autofocus
               placeholder="Untitled snippet" v-model.trim="snippet.title">
        <div class="text-gray-600 dark:text-white">Created by <span class="text-green-400">{{ $auth.user.name }}</span>
        </div>
      </div>
    </div>

    <div class="container ">
      <div class="flex items-center mb-6">
        <div class="text-xl font-medium font-header text-gray-600 m-3">{{ currentStepIndex + 1 }}/{{ steps.length }}
        </div>

        <input type="text"
               class="text-xl dark:text-white font-fira bg-transparent rounded border-2 font-header border-dashed border-gray-400 px-2 py-1"
               placeholder="Untitled Step" v-model.trim="currentStep.title">
      </div>


      <div class="flex flex-wrap lg:flex-nowrap">
        <div class="w-full lg:w-8/12 mb-6 lg:mb-0 lg:mr-16 flex flex-wrap lg:flex-nowrap justify-between items-start">
          <div class="order-first flex flex-row lg:flex-col mr-2">

            <step-navigation-button :step="previousStep">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
            </step-navigation-button>
            <add-step-button :snippet="snippet" :currentStep="currentStep" @added="handleAdded" position="before"/>
          </div>


          <step-editor :step="currentStep" v-model="currentStep.body"/>
          <div class="flex order-first flex-row-reverse lg:flex-col lg:order-last ml-2">
            <step-navigation-button :step="nextStep">
              <svg xmlns="http://www.w3.org/2000/svg" class="fill-current h-6 w-6 text-white" fill="none"
                   viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </step-navigation-button>


            <add-step-button position="after" :snippet="snippet" :currentStep="currentStep" @added="handleAdded"/>

            <a href="#" @click.prevent="deleteStep(currentStep)" v-if="steps.length > 1" title="delete step"
               class="bg-red-300 rounded p-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-6 w-6 text-red-500"
                   viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </a>
          </div>
        </div>
        <div class="w-full lg:w-4/12">

          <div class="mb-8">
            <h1 class="text-xl text-gray-600 font-medium mb-6"> Steps</h1>
            <step-list :steps="orderedStepAsc" :currentStep="currentStep"/>
            <div class="border-t-2 border-gray-300 py-6 mt-6">
              <div class="text-gray-500 text-sm mb-6">
                <template v-if="lastSaved">
                  Last saved {{ lastSaved }} ago
                </template>
                <template v-else>
                  No data saved yet
                </template>
              </div>
              <div class="flex items-baseline">
                <input type="checkbox" name="public" id="public" class="mr-2" v-model="snippet.is_public">
                <label for="public" class="text-gray-600 font-medium">Public</label>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import Vue from "vue";
import browseSnippet from "~/mixins/snippets/browseSnippet";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default Vue.extend({

  middleware: 'auth',
  head() {
    return {
      title: `Edit ${this.snippet.title}`
    }
  },

  data() {
    return {
      snippet: null,
      steps: [],
      lastSaved: null,
      interval: null
    }
  },
  beforeMount() {
    if (!this.snippet.owner) {
      this.$router.replace(`/snippets/${this.$route.params.id}`)
    }
  },
  mounted() {
    this.$watch("currentStep", this.stepWatcher(), {deep: true})
  },
  watch: {
    'snippet.title': {
      handler: debounce(async function (title) {
        try {

          await this.$axios.$patch(`/api/snippets/${this.$route.params.id}`, {title})
          clearInterval(this.interval)
          this.touchLastSaved();
        } catch (e) {
          this.$store.commit("alert/SHOW_ERROR", e.response.data.message);
        }
      }, 1000)
    }, 'snippet.is_public': {
      handler: debounce(async function (is_public) {
        try {
          await this.$axios.$patch(`/api/snippets/${this.$route.params.id}`, {is_public})
          clearInterval(this.interval)
          this.touchLastSaved();
        } catch (e) {
          this.$store.commit("alert/SHOW_ERROR", e.response.data.message);
        }
      }, 1000)
    },
  },
  mixins: [browseSnippet],
  async asyncData(ctx) {
    try {
      const snippet = await ctx.app.$axios.$get(`/api/snippets/${ctx.params.id}`)
      if (!snippet.data.owner) {
        ctx.store.commit("alert/SHOW_ERROR", "That's something you can't do that.")

      }
      return {
        snippet: snippet.data,
        steps: snippet.data.steps
      }


    } catch (e) {
      ctx.store.commit("alert/SHOW_ERROR", e.response.data.message)
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    touchLastSaved() {
      const lastSaved = new Date();
      this.interval = setInterval(() => {
        this.lastSaved = formatDistanceToNow(lastSaved, {includeSeconds: true})
      }, 2000)

    },
    async handleAdded(step) {
      this.steps.push(step)
      await this.$router.push({query: {step: step.id}})
    },
    async deleteStep(step) {
      await this.$axios.$delete(`/api/snippets/${this.snippet.id}/steps/${this.currentStep.id}`)

      let previousStep = this.previousStep;
      this.steps = this.steps.filter(s => s.id !== step.id);
      await this.$router.push({query: {step: previousStep?.id || this.steps[0].id}});
    },
    stepWatcher() {
      return debounce(async function (step) {
        let {title, body, id} = step
        try {
          await this.$axios.$patch(`/api/snippets/${this.$route.params.id}/steps/${id}`, {title, body})
          clearInterval(this.interval);
          this.touchLastSaved()
        } catch (e) {
          this.$store.commit("alert/SHOW_ERROR", e.response.data.message);
        }
      }, 1000)

    }
  }

})
</script>
