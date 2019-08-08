import Vue from 'vue'
// import './plugins/axios'
import App from './App.vue'
import router from '../src/router/router'
 //引入elemen-ui插件
import Element from 'element-ui'

import i18n from './lang' //引入多语言切换功能插件

//引入axios插件
import axios from 'axios';

// 引入echarts插件
import echarts from 'echarts';
import $ from 'jquery';//引入jQuery;
import store from './store'
import './styles/element-variables.scss' //element-ui css
import './styles/index.scss' // global css

import './icons' //引入svg
import './permission'; //引入登录验证


// Vue.use(VueI18n)

// const i18n = new VueI18n({
//   locale:'zh',
//   messages:{
//     'zh':require('./lang/zh'),
//     "en":require("./lang/en")
//   }
// })

Vue.use(Element, {
  //size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
// Vue.use(myCharts);
// 引用axios，并设置基础URL为后端服务api地址
// var axios = require('axios')
// axios.defaults.baseURL = 'https://localhost:8080/api'
// 将API方法绑定到全局
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts;
Vue.prototype.$ = $;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
