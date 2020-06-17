import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { tables } from "./modules";

export default new Vuex.Store({
  state: {
    isLoading: false
  },
  mutations: {
    SET_ISLOADING(state, payload) {
      state.isLoading = payload;
    }
  },
  actions: {},
  modules: {
    tables
  }
});
