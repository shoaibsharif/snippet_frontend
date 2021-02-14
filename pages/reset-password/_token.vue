<template>
  <div class="flex items-center max-w-sm md:max-w-2xl mt-20 lg:mt-40 mx-auto my-auto">

    <form @submit.prevent="sendPasswordReset" class="form">
      <p class="my-2 mx-auto">Reset Password</p>

      <text-field label="Email" type="email" v-model="data.email" name="email" disabled/>
      <text-field label="New password" type="password" v-model="data.password" name="newPassword"
                  :error="error && error.password"/>
      <text-field label="Confirm new password" type="password" v-model="data.password_confirmation"
                  name="newPasswordConfirmation" :error="error && error.password_confirmation"/>
      <button class="form-button--submit">submit new password</button>
    </form>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Reset Password"
    }
  },
  data() {
    return {
      data: {
        email: this.$route.query?.email,
        password: "",
        password_confirmation: "",
        token: this.$route.params?.token
      },
      error: null
    }
  },
  methods: {
    async sendPasswordReset() {
      try {
        const response = await this.$axios.$post("api/auth/reset-password", {...this.data});
        this.$store.commit("alert/SHOW_SUCCESS", response.message);
        this.error = null;
      } catch (e) {
        this.error = e.response.data.errors
        this.$store.commit("alert/SHOW_ERROR", this.error?.email?.join(" "));
      }
    }
  },
}
</script>
