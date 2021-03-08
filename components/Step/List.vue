<template>
  <ul>
    <li v-for="(step, index) in steps" :key="index">
      <nuxt-link class="font-medium font-sans my-1 dark:text-white" :to="{query: {step: step.id}}"
                 :class="{'font-bold': step.id === currentStep.id}">
        {{ index + 1 }}. {{ step.title || 'untitled step' }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    steps: {
      required: true,
      type: Array
    },
    currentStep: {
      required: true,
      type: Object
    }
  }
}
</script>
