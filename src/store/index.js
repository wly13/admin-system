import Vue from 'vue';
import Vuex from 'vuex';

Vue.use (Vuex);
const store = new Vuex.Store ({
  state: {
    isLogin: false,
    loginName: null,
    info:{
      age:[],
      sex:[],
      address:[]
    }
  },
  mutations: {
    Login (state, data) {
      // state.isLogin = data;
      sessionStorage.setItem ('loginName', data.username);
      sessionStorage.setItem ('isLogin', true);
      state.loginName = data.username;
      state.isLogin = true;
    },
    loginOut(state){
      sessionStorage.removeItem('loginName');
      sessionStorage.removeItem('isLogin');
      state.isLogin=false;
      state.loginName='';
    },
    getInfo(state,data){
      state.info.sex = data.sex;
      state.info.age= data.age;
      state.info.address = data.address;
      console.log(state.info.sex);
    },
  },
  getters: {
    isLogin (state) {
      if (!state.isLogin) {
        state.isLogin = sessionStorage.getItem ('isLogin'); //从sessionStorage中读取状态
        state.loginName = sessionStorage.getItem ('loginName');
      }
      return state.isLogin;
    },
  },
});
export default store;
