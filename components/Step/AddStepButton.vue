<template>
  <a href="#" @click.prevent="addStep" :title="`Add Step ${position}`" class="bg-green-300 rounded p-3" v-bind="$attrs">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-6 w-6 text-green-700" viewBox="0 0 24 24"
         stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
    </svg>
  </a>
</template>

<script>
export default {
  props: {
    position: {
      required: true,
      type: String
    },
    snippet: {
      required: true
    },
    currentStep: {
      required: true
    }
  },
  methods: {
    async addStep() {
      const res = await this.$axios.$post(`/api/snippets/${this.snippet.id}/steps`, {[this.position]: this.currentStep.id});
      // await this.$router
      this.$emit('added', res.data);
    }
  }
}
</script>

