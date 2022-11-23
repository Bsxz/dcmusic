import { createStore } from "vuex";
// import createPersistedState from "vuex-persistedstate";
import state from "./State";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export const store = createStore({
  state,
  mutations,
  actions,
  getters,
  // plugins: [createPersistedState()],
});
