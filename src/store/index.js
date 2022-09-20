import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const NAMES = {
  set_token: "set_token",
  set_warehouseEditor:"set_warehouseEditor",
  token: "token",
  warehouseEditor: "warehouseEditor"
}

export default new Vuex.Store({
  state: {
    token: "",
    warehouseEditor:'' 
  },
  getters: {
  },
  mutations: {
    [NAMES.set_token](state, payload) {
      state.token = payload.token_header + payload.token;
    },
    [NAMES.set_warehouseEditor](state, payload) {
      state.warehouseEditor = payload;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      key:"token",
      reducer: (state) => {
        return {
          token: state.token,
        }
      }
    }),
  ]
})
