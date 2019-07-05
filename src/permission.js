import router from './router/router'
// import ElementUi from 'element-ui'
import store from './store'
// import { async } from 'q';
router.beforeEach((to ,from ,next) =>{
  let isLogin = store.getters.isLogin;
  console.log(isLogin)
  if(!isLogin){
    if(to.path!=='/login'){
      return next({path:'/login'})
    }else{
      next()
    }
  }else{
    if(to.path==='/login'){
      return next({path:'/'})
    }
    next();
  }


  // 这是通过router.js里面的要求登陆验证的方式
  // if(to.matched.some(m => m.meta.auth)){
  //   if(window.localStorage.isLogin){
  //     next()
  //   }else{
  //     next({path: '/login',query:{url:to.fullPath}})
  //     // Vue.prototype.$message.warning('检测到您还未登录,请登录后操作！')
  //   }
  // }else{
  //   next()
  // }

})