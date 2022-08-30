import { createStore } from "vuex";

// 用户相关的store
import userStore from "./modules/user";
import asideStore from "./modules/aside";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    userStore,
    asideStore
  }
});
