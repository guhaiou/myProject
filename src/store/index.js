import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
  showBottomNav:true,
  showLogin:false,
  state: localStorage.getItem('isselect'),
  isShow:false,
  isLoading:false,
  kaoGangId:'',
  examPaperInfoId:''
}

export default new Vuex.Store({
  state
});
