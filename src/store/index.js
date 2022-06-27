import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const actions={

}
const mutations={
  Tage(state,value){
    state.Activepath=value
  }
}

const state={
  Activepath: "",
  sum:'',
  obj:''
}
const  store= new Vuex.Store({
  actions,
  mutations,
  state
})

export default store