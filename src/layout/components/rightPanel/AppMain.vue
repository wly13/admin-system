<template>
  <el-main class="app-main">
    <transition name="fade" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>
  </el-main>
</template>
<script>
export default {
  name: "AppMain",
  computed:{
    key(){
      return this.$route.fullPath
    }
  }
};
</script>

