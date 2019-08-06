<template>
  <div id="echarts">
    <div id="age"></div>
    <div id="sex"></div>
    <div id="address"></div>
  </div>
</template>

<script>
export default {
  name: "Linear",
  data() {
    return {
      chart: null,
      // age:this.$store.state.info.age
      dataList: [],
      info: {
        age: [],
        sex: [],
        address: []
      }
    };
  },
  // created(){
  //   this.getData();
  // },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios({
        method: "POST",
        url: "http://localhost:8080/api/list",
        changeOrigin: true
      }).then(result => {
        this.dataList = result.data;
        console.log(this.dataList);
        for (let i = 0; i < this.dataList.length; i++) {
          this.info.age.push(this.dataList[i].age);
          if (this.dataList[i].sex === "女") {
            this.info.sex.push("nv");
          } else {
            this.info.sex.push("nan");
          }
          // this.info.sex.push(this.dataList[i].sex);
          this.info.address.push(this.dataList[i].address);
        }
        this.ageChart(this.info.age);
        this.sexCharts(this.info.sex);
        // this.$store.commit("getInfo", this.info);
      });
    },
    ageChart(age) {
      this.chart = this.$echarts.init(document.getElementById("age")); //获取dom元素
      console.log(age);
      var ageArr = [];
      var ageNum = age.reduce((pre, cur) => {
        if (cur in pre) {
          pre[cur]++;
        } else {
          pre[cur] = 1;
        }
        return pre;
      }, {});
      console.log(ageNum);
      for (let i in ageNum) {
        ageArr.push(ageNum[i]);
      }
      console.log(ageArr);
      this.chart.setOption({
        title: {
          text: "年龄分布图",
          bottom: 0,
          x: "center"
        },
        xAxis: {
          name: "年龄",
          type: "category",
          data: Array.from(new Set(age.sort())), //数组排序并去重
          show: true
        },
        yAxis: {
          type: "value",
          data: ageArr
        },
        series: [
          {
            data: ageArr,
            type: "bar"
          }
        ]
      });
    },
    sexCharts(sex) {
      this.chart = this.$echarts.init(document.getElementById("sex"));
      console.log(sex);
      var sexArr = [];
      var sexNum = sex.reduce((pre, cur) => {
        if (cur in pre) {
          pre[cur]++;
        } else {
          pre[cur] = 1;
        }
        return pre;
      }, {});
      console.log(sexNum);
      for (let i in sexNum) {
        sexArr.push(sexNum[i]);
      }
      console.log(sexArr);
      this.chart.setOption({
        title: {
          text: "sex分布图",
          bottom: 0,
          x: "center",
          // textStyle:{
          //   color:"#ccc"
          // }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: {
          name: "性别",
          data: [
            { value: sexNum.nv, name: "女" },
            { value: sexNum.nan, name: "男" }
          ],
          type: "pie",
          radius: "55%",
          center: ["50%", "50%"]
        }
      });
    },
    addressCharts(address) {
      this.chart = this.$echarts.init(document.getElementById);
    }
  }
};
</script>

<style lang="scss" scoped>
#echarts {
  width: 100%;
  height: 100%;
  // background-color: #2d3a4b;
  div {
    float: left;
    width: 50%;
    height: 50%;
    canvas{
      width: 100% !important;
      height: 100% !important;
    }
  }
  #address {
    width: 100%;
  }
}
</style>


