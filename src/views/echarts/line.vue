<template>
  <div id="line"></div>
</template>

<script>
export default {
  name: "Linear",
  data() {
    return {
      chart: null,
      age:this.$store.state.info.age
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(document.getElementById("line"))//获取dom元素
      console.log(this.age);
      this.chart.setOption(
        {
          title:{
            text:"年龄分布图"
          },
          xAxis:{
            name:"年龄",
            type:"category",
            data:this.age,
            show:true,
          },
          yAxis:{
            type:"value",
            data:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
          },
          series:[{
            data:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            type:"bar"
          }]
        }
      )
    }
  }
};
</script>

<style lang="scss" scoped>
#app-main{
  #line{
  width: 600px;
  height: 600px;
  }
}

</style>


