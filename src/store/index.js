import { createStore } from 'vuex'

export default createStore({
  state: {
    nav_show : false,
    sendMail : {},
    count: 0,
    display: false,
    obj: {},
    page: 1,
    keyword:'서울',   
    menu:'I'

  },
  getters: {

  },
  mutations: {
    updateNav(state,payload){
      state.nav_show = payload
    },
    updateMail(state,payload){
      console.log("payload=" +payload)
      state.sendMail.mail = payload
    },
    updateId(state,payload){
      state.sendMail.id = payload
    },
    update_count(state, payload) {
      state.count = payload;
    },
    update_display(state, payload) {
        state.display = payload;
    },
    update_list(state, payload) {
        state.obj = payload;
    },
    update_page(state, payload) {
        state.page = payload;
    },
    update_limit(state, payload) {
        state.limit = payload;
    },
    update_keyword(state, payload) {
      state.keyword = payload;
  },
    update_menu(state,payload){
      state.menu = payload
    },
  },
  actions: {
    navShow(context,show){
      context.commit('updateNav',show)
    },
    sendMail(context,mail){
      console.log("sendMail 진입")
      context.commit('updateMail',mail)
    },
    sendId(context,id){
      context.commit('updateId',id)
    },
    count(context, count) {
      //commit(mutations에 정의된 함수이름, 함수에 넘길 값)
      context.commit('update_count', count)
    },
    display(context, display) {
      
        context.commit('update_display', display)
    },
    store_obj(context, obj) {
      
        context.commit('update_list', obj)
    },
    store_page(context, page) {
        
        context.commit('update_page', page)
    },
    store_limit(context, limit) {
      
        context.commit('update_limit', limit)
    },
    store_keyword(context, keyword) {
      
      context.commit('update_keyword', keyword)
    },
    store_menu(context, menu) {
      
      context.commit('update_menu', menu)
    }

    
  },
  modules: {
    
  }
})
