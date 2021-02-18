<template>
  <div class="sk">
    <div class="sk-cube-grid">
      <div class="sk-cube sk-cube1"></div>
      <div class="sk-cube sk-cube2"></div>
      <div class="sk-cube sk-cube3"></div>
      <div class="sk-cube sk-cube4"></div>
      <div class="sk-cube sk-cube5"></div>
      <div class="sk-cube sk-cube6"></div>
      <div class="sk-cube sk-cube7"></div>
      <div class="sk-cube sk-cube8"></div>
      <div class="sk-cube sk-cube9"></div>
    </div>
  </div>

</template>

<script>
import qs from 'querystring'

export default {
  middleware: 'auth',
  async mounted() {
    if (this.$auth.user.id === +this.$route.params.id) {
      try {
        const queryString = {
          expires: this.$route.query?.expires,
          signature: this.$route.query?.signature
        }
        if (this.$route.query?.email) {
          queryString['email'] = this.$route.query?.email
        }
        await this.$axios.$get(`/api/auth/email/verify/${this.$route.params.id}/${this.$route.params.hash}?${qs.stringify(queryString)}`)
        this.$store.commit('alert/SHOW_SUCCESS', "Email verified")
      } catch (e) {
        this.$store.commit("alert/SHOW_ERROR", e.response.data.message);
      }
    } else {
      this.$store.commit('alert/SHOW_ERROR', "Please login with correct user and verify your email")
    }
    await this.$router.replace('/')
  },

}
</script>


<style>
.sk {
  @apply w-full flex justify-center items-center;
  height: calc(100vh - 96px);
}

.sk-cube-grid {
  width: 40px;
  height: 40px;
}

.sk-cube-grid .sk-cube {
  @apply bg-green-400;
  width: 33%;
  height: 33%;
  float: left;
  -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
}

.sk-cube-grid .sk-cube1 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

.sk-cube-grid .sk-cube2 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

.sk-cube-grid .sk-cube3 {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.sk-cube-grid .sk-cube4 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}

.sk-cube-grid .sk-cube5 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

.sk-cube-grid .sk-cube6 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

.sk-cube-grid .sk-cube7 {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}

.sk-cube-grid .sk-cube8 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}

.sk-cube-grid .sk-cube9 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

@-webkit-keyframes sk-cubeGridScaleDelay {
  0%, 70%, 100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}

@keyframes sk-cubeGridScaleDelay {
  0%, 70%, 100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}
</style>
