<template>
  <div>
    <div class="bg-white shadow dark:bg-gray-900">
      <div class="container mb-16 py-6 md:px-20">
        <h1 class="text-4xl leading-tight font-medium dark:text-gray-400"> Profile </h1>
      </div>
    </div>
    <div class="container">
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
          <form class="form">
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
          <form class="form">
            <text-field label="Current password" type="password" v-model="current_password" name="newPassword"
                        :error="errors && errors.password"/>
            <text-field label="New password" type="password" v-model="newPassword" name="newPassword"
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
  data() {
    return {

      name: this.$auth.user.name,
      email: this.$auth.user.email,
      username: this.$auth.user.username,
      current_password: "",
      newPassword: "",
      password_confirmation: "",

      errors: null
    }
  },
}
</script>

<style lang="scss" scoped>
.form-button {
  @apply rounded uppercase tracking-widest text-xs bg-indigo-500 dark:bg-indigo-700 px-3 py-3 max-w-md ml-auto text-black font-sans;
}

</style>
