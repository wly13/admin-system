<template>
  <el-pagination
  :total="this.total"
  ></el-pagination>
</template>
<script>
export default {
  name:"Paging",
  props:{
    total:{
      type:Number,
      required:true
    }
  },
  data(){
    return{

    }
  }
}
</script>

