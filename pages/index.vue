<template>
  <div class="container mx-auto">Home {{ world }}</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  head() {
    return {
      title: 'Home'
    }
  },
  middleware: ['auth'],
  data: () => ({
    world: "hello"
  })
});
</script>

<style>
h1,
h2,
h3,
h4,
h5,
h6 {
  @apply font-header;
}
</style>
