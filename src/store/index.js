import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const NAMES = {
  set_token: "set_token",
  set_warehouseDataId: "set_warehouseDataId",
  token: "token",
  warehouseDataId: "warehouseDataId",
}

export default new Vuex.Store({
  state: {
    token: "",
    warehouseDataId: '',
  },
  getters: {
  },
  mutations: {
    [NAMES.set_token](state, payload) {
      state.token = payload.tokenHeader+payload.token;
    },
    [NAMES.set_warehouseDataId](state, payload) {
      state.warehouseDataId = payload;
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
        return state.token
      }
    }),
  ]
})
