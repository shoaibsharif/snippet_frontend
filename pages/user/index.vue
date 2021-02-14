<template>
  <div>
    You are not supposed to be here.
  </div>
</template>

<script>
export default {
  mounted() {
    this.$router.replace("/user/profile")
  }
}
</script>
