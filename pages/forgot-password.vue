<template>
  <div class="flex items-center max-w-sm md:max-w-2xl mt-20 lg:mt-40 mx-auto my-auto">

    <form @submit.prevent="sendPasswordReset" class="form">
      <p class="my-2">Forgot your password? Just let use know your email address and we will email you a password reset
        link</p>

      <text-field label="Email" type="email" v-model="email" name="email" :error="error && error.email"/>

      <button class="form-button--submit">email password reset link</button>
    </form>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  auth: "guest",
  head() {
    return {
      title: "Forgot Password"
    }
  },
  data() {
    return {
      email: "",
      error: null
    }
  },
  methods: {
    async sendPasswordReset() {
      try {
        // await this.$axios.$get("sanctum/csrf-cookie")
        const response = await this.$axios.$post("/api/auth/forgot-password", {email: this.email});
        this.$store.commit("alert/SHOW_SUCCESS", response.message);
        this.error = null;

      } catch (e) {
        this.error = e.response.data.errors
        this.$store.commit("alert/SHOW_ERROR", e.response.data.message);
      }
    }
  },
}
</script>
