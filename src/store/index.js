import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const NAMES = {
  set_token: "set_token",
  token: "token",
}

export default new Vuex.Store({
  state: {
    token: "",
  },
  getters: {
  },
  mutations: {
    [NAMES.set_token](state, payload) {
      state.token = payload.token_header + payload.token;
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
    })
  ]

})
