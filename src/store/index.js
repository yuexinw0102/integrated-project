import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const NAMES = {
  set_token: "set_token",
  token: "token",
  set_city:"set_city",
  wa_city:'wa_city',
}

export default new Vuex.Store({
  state: {
    token: "",
    wa_city:[],
  },
  getters: {
  },
  mutations: {
    [NAMES.set_token](state, payload) {
      state.token = payload.token_header + payload.token;
    },
    [NAMES.set_city](state, payload) {
      state.wa_city = payload
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
          token: state
        }
      }
    })
  ]

})
