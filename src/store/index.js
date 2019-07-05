import Vue from 'vue';
import Vuex from 'vuex';

Vue.use (Vuex);
const store = new Vuex.Store ({
  state: {
    isLogin: false,
    loginName: null,
  },
  mutations: {
    Login (state, data) {
      // state.isLogin = data;
      localStorage.setItem ('loginName', data.username);
      localStorage.setItem ('isLogin', true);
      state.loginName = data.username;
      state.isLogin = true;
    },
    loginOut(state){
      localStorage.removeItem('loginName');
      localStorage.removeItem('isLogin');
      state.isLogin=false;
      state.loginName='';
    }
  },
  getters: {
    isLogin (state) {
      if (!state.isLogin) {
        state.isLogin = localStorage.getItem ('isLogin'); //从sessionStorage中读取状态
        state.loginName = localStorage.getItem ('loginName');
      }
      return state.isLogin;
    },
  },
});
export default store;
