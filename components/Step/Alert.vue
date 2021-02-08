<template>
  <div class="alert-toast fixed top-40 right-0 m-8 w-5/6 md:w-full max-w-sm" :class="{'alert-d-close': close}"
       @click.prevent="closeSnackBar">

    <div class="close cursor-pointer flex items-center justify-between w-full p-2 rounded shadow-lg capitalize"
         title="close"
         :class="{'bg-green-300 text-green-700': type === 'success', 'bg-red-300 text-red-700': type==='danger'}">

      {{ message }}
      <svg class="fill-current" :class="{'text-green-700': type === 'success', 'text-red-700': type==='danger'}"
           xmlns="http://www.w3.org/2000/svg" width="18" height="18"
           viewBox="0 0 18 18">
        <path
          d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      close: true
    }
  },
  watch: {
    message(newVal) {
      if (newVal.length) {
        this.close = false;
      }
    }
  },
  computed: {
    message() {

      return this.$store.state.alert.message
    },
    type() {
      return this.$store.state.alert.type
    }
  },
  methods: {
    closeSnackBar() {
      this.close = true;
      this.$store.commit('alert/clearAlert')
    }
  }
}
</script>
<style>
.alert-toast {
  -webkit-animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

/*Toast close animation*/
.alert-d-close {
  -webkit-animation: fade-out-right 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: fade-out-right 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  @apply hidden;
}
</style>
