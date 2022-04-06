import { createStore } from 'vuex'

export default createStore({
  state: {
    nav_show : false
  },
  getters: {

  },
  mutations: {
    updateNav(state,payload){
      state.nav_show = payload
    }
  },
  actions: {
    navShow(context,show){
      context.commit('updateNav',show)
    }
  },
  modules: {
    
  }
})
