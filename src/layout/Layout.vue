<template>
  <el-container class="layout-container">
      <left-panel></left-panel>
      <right-panel></right-panel>
  </el-container>
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



