<template>
  <div class="layout-container">
    <!-- <p>this is a layout framework</p>
    <el-button @click="loginOut">推出登录</el-button> -->
    <!-- <div class="left-nav"> -->
      <left-panel></left-panel>
    <!-- </div> -->
    <!-- <div class="right-panel"> -->
      <right-panel></right-panel>
    <!-- </div> -->
  </div>
</template>
<script>
import LeftPanel from './components/leftPanel'
import '@/styles/layout.scss'
import '@/styles/element-variables.scss'
import RightPanel from './components/rightPanel'
export default {
  name:"Layout",
  components:{
    LeftPanel,
    RightPanel
  }
}
</script>



