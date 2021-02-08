export const state = () => ({
  message: '',
  type: ''
})

const getters = {
  snack(state) {
    return state;
  }
}

export const mutations = {
  setAlert(state, {message, type}) {
    state.message = message;
    state.type = type;
  },
  clearAlert(state) {
    state.message = ''
    state.type = ''
  }
}


