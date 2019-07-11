<template>
  <el-container direction="vertical" class="right-panel">
    <header-bar></header-bar>
    <app-main></app-main>
  </el-container>
</template>
<script>
import AppMain from './AppMain'
import HeaderBar from './HeaderBar'
export default {
  name:"RightPanel",
  components:{
    AppMain,
    HeaderBar
  }
}
</script>
<style lang="scss" scoped>
  
</style>


