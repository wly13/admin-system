<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive : true
    }
  },
  methods:{
    reload(){//自定义一个reload方法，用于删除或者增加数据后刷新页面
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
    }
  }
};
</script>

