<template>
  <div class="right-panel">
    <header-bar></header-bar>
    <app-main></app-main>
  </div>
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


