<template>

  <div
    v-if="show"
    :class="{
      'bg-red-600': type === 'error',
      'bg-green-600': type === 'success'
    }"
    class="text-white fixed top-2 left-1/2 right-auto transform -translate-x-1/2 justify-center flex items-center py-2 px-1 rounded"
    style="min-width: 288px"
  >
    <p class="text-white ml-2">{{ message }}</p>
    <button class="ml-auto mr-2 pl-2" @click="$store.commit('alert/CLOSE')">&times;</button>
  </div>

</template>

<script>
import {mapState} from "vuex";
import debounce from "lodash.debounce"

export default {
  name: "alert",
  computed: mapState("alert", ["message", "show", "type"]),
  watch: {
    show: {
      immediate: true,
      handler: debounce(function (value) {
        if (value)
          this.$store.commit("alert/CLOSE");

      }, 7000)
    }
  }
};
</script>

