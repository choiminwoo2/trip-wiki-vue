import { createStore } from 'vuex'

export default createStore({
  state: {
    nav_show : false,
      count: 0,
      sendMail : {},
      display: false,
      obj: {},
      page: 1,
      keyword:'서울',
      menu:"I",
      regId:'11B00000',
      regId2:'11B10101'
  },
  getters: {

  },
  mutations: {
    updateNav(state,payload){
      state.nav_show = payload
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
  update_menu(state, payload) {
    state.menu = payload;
  },
  update_regId(state, payload) {
   state.regId = payload;
  },
  updateMail(state,payload){
    console.log("payload=" +payload)
    state.sendMail.mail = payload
  },
  updateId(state,payload){
    state.sendMail.id = payload
  },

  },
  actions: {
    navShow(context,show){
      context.commit('updateNav',show)
    },
    count(context, count) {
      //commit(mutations에 정의된 함수이름, 함수에 넘길 값)
      context.commit('update_count', count)
    },
    sendMail(context,mail){
      console.log("sendMail 진입")
      context.commit('updateMail',mail)
    },
    sendId(context,id){
      context.commit('updateId',id)
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
  },
  store_regId(context, regId) {

    context.commit('update_regId', regId)
  }
    },
  modules: {

  }
})