import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { input: "" },
  mutations: {
    setInput(state, value) {
      state.input = value;
    }
  },
  actions: {}
});
