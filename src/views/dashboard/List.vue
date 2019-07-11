<template>
  <div>
    <el-table :data="dataList" stripe style="width:100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" prop="id" label="编号" width="100" sortable></el-table-column>
      <el-table-column prop="name" label="姓名" width="100" sortable></el-table-column>
      <el-table-column prop="sex" label="性别" width="100" sortable></el-table-column>
      <el-table-column prop="age" label="年龄" width="100" sortable></el-table-column>
      <el-table-column prop="birthday" label="生日" width="120" sortable></el-table-column>
      <el-table-column prop="address" label="地址" min-width="180" sortable></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <paging :total="total"></paging>
  </div>
</template>
<script>
import Paging from './Paging'
export default {
  name: "List",
  props: {
    message: {
      type: Array,
      required: true
    }
  },
  components:{
    Paging
  },
  data() {
    return {
      dataList: [],
      data: "",
      total:0,
    };
  },
  mounted() {
    this.$axios({
      method: "get",
      url: "http://localhost:8080/api/list",
      changeOrigin: true
    }).then(result => {
      this.dataList = result.data;
      console.log(this.dataList.length)
    });
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDel(index, row) {
      console.log(index, row);
    }
  },
  watch: {
    message(val) {
      this.dataList = val;
      console.log(this.dataList.length)
    },
  }
};
</script>

