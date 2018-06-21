import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gwToken: '',
    loginMsg: '',
    curPage: {
      isHome: false,
      name: '',
      childName: null
    },
    curEquip: {
      equipNo: ''
    }
  },
  mutations: {
    getStorageToken (state) {
      let token = window.localStorage.getItem('gw_token')
      state.gwToken = token
    },
    getStorageLoginMsg (state) {
      state.loginMsg = window.localStorage.getItem('login_msg')
    },
    setEquipNo (state, nom) {
      state.curEquip.equipNo = nom
    },
    setCurpage (state, obj) {
      state.curPage.isHome = obj.isHome
      state.curPage.name = obj.name
      state.curPage.childName = obj.childName || null
    }
  },
  actions: {
    reflashSet ({commit}) {
      commit('getStorageToken')
      commit('getStorageLoginMsg')
    }
  }
})
