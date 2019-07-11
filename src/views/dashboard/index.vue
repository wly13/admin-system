<template>
  <div>
    <!-- search -->
    <el-form :inline="true" :model="filters">
      <el-form-item>
        <el-input v-model="filters.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="getUsers">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>

    <!-- table -->
    <el-table :data="dataList" stripe style="width:100%" v-loading="listLoading">
      <el-table-column type="selection" width="55"></el-table-column>
      <!-- <el-table-column type="index" prop="id" label="编号" width="100" sortable></el-table-column> -->
      <el-table-column prop="id" label="编号" width="100" sortable></el-table-column>
      <el-table-column prop="name" label="姓名" width="100" sortable></el-table-column>
      <el-table-column prop="sex" label="性别" width="100" sortable></el-table-column>
      <el-table-column prop="age" label="年龄" width="100" sortable></el-table-column>
      <el-table-column prop="birthday" label="生日" width="120" sortable></el-table-column>
      <el-table-column prop="address" label="地址" min-width="180" sortable></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- table 传值 -->
    <!-- <List :message='byValue'></List> -->

    <!-- 分页 paging -->
    <el-pagination :total="total" :page-size="pageSize" layout="total, prev, pager, next"></el-pagination>

    <!-- dialog -->
    <!-- <Dialog ref="msg"></Dialog> -->
    <Dialog ref="message"></Dialog>
  </div>
</template>
<script>
// import List from "./List";
import Dialog from "@/views/utils/Dialog";
import { type } from "os";
export default {
  name: "Dashbord",
  components: {
    // List,
    Dialog
  },
  inject: ["reload"], //注入reload方法
  data() {
    return {
      filters: {
        name: ""
      },
      dataList: [],
      total: 0,
      pageSize: 10,
      listLoading: false,
      message: {
        title: "",
        visible: false,
        info: {
          name: "",
          sex: "",
          age: "",
          birth: "",
          address: ""
        }
      }
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.listLoading = true;
      this.$axios({
        method: "POST",
        url: "http://localhost:8080/api/name",
        changeOrigin: true,
        data: {
          name: this.filters.name
        }
      }).then(result => {
        this.listLoading = false;
        this.dataList = result.data;
        this.total = this.dataList.length;
      });
    },
    handleAdd() {
      let self = this;
      self.message.title = "新增";
      self.message.visible = true;
      self.message.info = Object.assign({}, "");
      if (this.message != undefined) {
        self.$refs.message.getMsg(JSON.parse(JSON.stringify(this.message)));
      }
    },
    handleEdit(row) {
      let self = this;
      self.message.title = "编辑";
      self.message.visible = true;
      self.message.info = row;
      if (this.message != undefined) {
        self.$refs.message.getMsg(JSON.parse(JSON.stringify(this.message)));
      }
    },
    handleDel(row) {
      // console.log(row);

      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            method: "post",
            url: "http://localhost:8080/api/delList",
            changeOrigin: true,
            data: {
              id: row.id
            }
          })
            .then(result => {
              console.log(result);
              if (result.data == 1) {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.reload(); 
              } else {
                this.$message({
                  type: "erroe",
                  message: "删除失败"
                });
                this.reload()
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            messsage: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.right-panel {
  .app-main {
    .el-form {
      height: 60px;
      background: #f2f2f2;
      padding-top: 10px;
      box-sizing: border-box;
    }
  }
}
</style>


