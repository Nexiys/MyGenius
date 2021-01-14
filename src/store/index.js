import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: window.localStorage.getItem('data'),
    isPausedFlag: false
  },
  mutations: {
    // 存储token
    setUserToken (state, userToken) {
      state.userToken = userToken
      window.localStorage.setItem('data', userToken)
    },
    // 移除token
    removeUserToken (state) {
      state.userToken = ''
      window.localStorage.removeItem('data')
    },
    // 暂停时间
    wholeTimeStop (state) {
      state.isPausedFlag = true
    },
    // 开始时间
    wholeTimeStart (state) {
      state.isPausedFlag = false
    }
  },
  actions: {
  },
  modules: {
  }
})
