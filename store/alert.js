export const state = () => ({
  message: "",
  show: false,
  type: "error"
});

export const mutations = {
  SHOW_ERROR(state, message) {
    state.type = "error";
    state.show = true;
    state.message = message;
  },

  SHOW_SUCCESS(state, message) {
    state.type = "success";
    state.show = true;
    state.message = message;
  },

  CLOSE(state) {
    state.show = false;
  }
};
