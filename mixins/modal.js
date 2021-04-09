import Vue from "vue";
import Modal from "~/components/Modal";

export default {
  methods: {
    openModal() {
      return new Promise((resolve, reject) => {
        const mboxInstance = Vue.extend(Modal)
        const modalComponent = new mboxInstance().$mount()
        document.getElementById('__nuxt').appendChild(modalComponent.$el);
        modalComponent.$data.openModal = true
        modalComponent.$on('confirm', result => {
          return resolve(result)
        })

      })
    },
  }
}
