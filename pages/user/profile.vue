<template>
  <div>
    <div class="bg-white shadow dark:bg-gray-900">
      <div class="container mb-16 py-6 md:px-20">
        <h1 class="text-4xl leading-tight font-medium dark:text-gray-400"> Profile </h1>
      </div>
    </div>
    <div class="container">
      <div class="mx-auto shadow-md bg-amber-100 text-amber-700 w-full lg:w-3/6 rounded p-3 flex items-center"
           v-if="!$auth.user.email_verified_at">
        <svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <div class="ml-3">
          <h3 class="text-xl">Verify your email</h3>
          <p class="dark:text-gray-600">Please verify your email address by clicking on the link we just emailed you. If
            you
            didn't receive the
            email, <a href="#" class="text-amber-700 underline" @click.prevent="sendEmailVerification">please click
              here</a></p>
        </div>
      </div>
      <div class="md:grid md:grid-cols-3 md:gap-6 my-2">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium font-sans dark:text-gray-400">Profile Information</h3>
            <p class="mt-1 text-sm text-gray-600">
              Update your account's profile information and email address.
            </p>
          </div>
        </div>
        <div class="md:col-span-2">
          <form class="form" @submit.prevent="updateProfileInformation">
            <text-field v-model="name" type="text" name="name" placeholder="John Doe" label="Name"
                        :error="errors && errors.name"/>
            <text-field v-model="username" type="text" name="username" placeholder="johndoe" label="Username"
                        :error="errors && errors.username"/>
            <text-field v-model="email" type="email" name="email" placeholder="m2@example.com" label="Email"
                        :error="errors && errors.email"/>
            <button class="form-button">save</button>
          </form>
        </div>
      </div>

      <div class="hidden sm:block">
        <div class="py-8">
          <div class="border-t border-gray-400 dark:border-gray-600"></div>
        </div>
      </div>

      <div class="md:grid md:grid-cols-3 md:gap-6 my-2">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium font-sans dark:text-gray-400">Update Password</h3>
          <p class="mt-1 text-sm text-gray-600">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>
        <div class="md:col-span-2">
          <form class="form" @submit.prevent="newPasswordChange">
            <text-field label="Current password" type="password" v-model="current_password" name="currentPassword"
                        :error="errors && errors.current_password"/>
            <text-field label="New password" type="password" v-model="password" name="newPassword"
                        :error="errors && errors.password"/>

            <text-field label="Confirm new password" type="password" v-model="password_confirmation"
                        name="newPasswordConfirmation" :error="errors && errors.password_confirmation"/>
            <button
              class="form-button">
              save
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  head() {
    return {
      title: "Profile"
    }
  },
  data() {
    return {

      name: this.$auth.user.name,
      email: this.$auth.user.email,
      username: this.$auth.user.username,
      current_password: "",
      password: "",
      password_confirmation: "",

      errors: null
    }
  },
  methods: {
    async updateProfileInformation() {
      try {
        await this.$axios.$put('/api/auth/user/profile-information', {
          name: this.name,
          email: this.email,
          username: this.username
        })
        this.errors = null;
        if (this.email !== this.$auth.user.email) {
          this.$store.commit("alert/SHOW_SUCCESS", "Profile updated. Please verify your email");
        } else
          this.$store.commit("alert/SHOW_SUCCESS", "Profile updated");
      } catch (e) {
        this.errors = e.response.data.errors
        this.$store.commit("alert/SHOW_ERROR", e.response.data.message);
      }
    },
    async newPasswordChange() {
      try {
        await this.$axios.$put('/api/auth/user/password', {
          current_password: this.current_password,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        this.errors = null;
        this.$store.commit("alert/SHOW_SUCCESS", "Password has been changed");
      } catch (e) {
        this.errors = e.response.data.errors
        this.$store.commit("alert/SHOW_ERROR", e.response.data.message);
      }
    },
    async sendEmailVerification() {
      await this.$axios.$post('api/auth/email/verification-notification')
      this.$store.commit("alert/SHOW_SUCCESS", "Email Notification sent");
    }
  },
}
</script>

<style lang="scss" scoped>
.form-button {
  @apply rounded uppercase tracking-widest text-xs bg-indigo-500 dark:bg-indigo-700 px-3 py-3 max-w-md ml-auto text-black font-sans;
}

</style>
