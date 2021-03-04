<template>
  <nuxt-link :to="step ? {query: {step: step.id}}: {}"
             class=" bg-gradient-to-br from-purple-500 to-indigo-500 rounded lg:mb-2 p-3"
             :class="{'pointer-events-none opacity-25': !step}">
    <slot/>
  </nuxt-link>
</template>


<script>
export default {
  props: {
    step: {
      type: Object | null
    }
  }
}
</script>
