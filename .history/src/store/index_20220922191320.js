import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const NAMES = {
  set_token: "set_token",
  set_warehouseEditor:"set_warehouseEditor",
  set_warehouseDataId: "set_warehouseDataId",
  token: "token",
  warehouseDataId: "warehouseDataId",
  warehouseEditor: "warehouseEditor"
}

export default new Vuex.Store({
  state: {
    token: "",
    warehouseEditor:'' ,
    warehouseDataId: '',
  },
  getters: {
  },
  mutations: {
    [NAMES.set_token](state, payload) {
      state.token = payload.tokenHeader + payload.token;
    },
    [NAMES.set_warehouseEditor](state, payload) {
      state.warehouseEditor = payload;
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
        return {
          token: state.token,
        }
      }
    }),
  ]
})
