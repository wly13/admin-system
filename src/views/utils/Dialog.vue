<template>
  <el-dialog :title="title" width="30%" :before-close="handleClose" :visible.sync="dialogVisible">
    <el-form :model="editForm" label-width="80px" :rules="FormRules" ref="editForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="editForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="editForm.sex">
          <el-radio class="radio" :label="1">男</el-radio>
          <el-radio class="radio" :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="editForm.age" :controls="controls"></el-input-number>
      </el-form-item>
      <el-form-item label="生日" prop="birth">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="editForm.birth"
          value-format="yyyy-MM-dd"
          format="yyyy 年 MM 月 dd 日"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input type="textarea" v-model="editForm.address"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="addSubmit" :loading="loading" v-show="submitFuc">提交</el-button>
      <el-button type="primary" @click="editSubmit" :loading="loading" v-show="!submitFuc">提交</el-button>
    </div>
  </el-dialog>
</template>
<script>
import axios from "axios";
import { setTimeout } from 'timers';
export default {
  name: "Dialog",
  data() {
    return {
      title: "",
      dialogVisible: false,
      msg: [],
      editForm: {
        id: "",
        name: "",
        sex: "",
        age: 0,
        birth: "",
        address: ""
      },
      loading: false,
      FormRules: {
        name: [{ required: true, trigger: "blur", message: "姓名不能为空" }],
        sex: [{ required: true, trigger: "blur", message: "请选择性别" }],
        age: [{ required: true, trigger: "blur", message: "请填写年龄" }],
        birth: [
          { required: true, trigger: "blur", message: "请填写生日" },
          { type: "string", message: "请填写正确的日期" }
        ],
        address: [{ required: true, trigger: "blur", message: "请填写地址" }]
      },
      controls: false,
      disabled: true,
      submitFuc: true
    };
  },
  mounted() {
    this.getMsg();
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.editForm = Object.assign({}, "");
        })
        .catch(_ => {});
    },
    getMsg(data) {
      for (let i in data) {
        this.msg.push(data[i]);
      }
      this.title = this.msg[0];
      if (this.title == "编辑") {
        this.submitFuc = false;
      } else {
        this.submitFuc = true;
      }
      this.dialogVisible = this.msg[1];
      if (this.msg[2] != undefined) {
        var info = JSON.parse(JSON.stringify(this.msg[2]));
        this.editForm = Object.assign({}, info);
        var sexNum = info.sex == "男" ? 1 : info.sex == "女" ? 0 : -1;
        if (sexNum != -1) {
          this.editForm.sex = sexNum;
        }
        var dateStr = info.birthday;
        if (dateStr) {
        //   var date = new Date(dateStr.replace(/-/, "/"));//将日期的字符串转为默认date对象
          this.editForm.birth = dateStr;
        }
      }
      this.msg.splice(0); //防止一直向数组里面添加数据，保持该数组只存传递过来的两个值
    },
    addSubmit() {
      axios({
        method:'post',
        url:"http://localhost:8080/api/addList",
        changeOrigin:true,
        data:this.editForm
      }).then(result =>{
        console.log(result.data)
        var statusNum = result.data
        if(statusNum==1){
          this.$notify({
            message:"添加成功，3秒中后将自动跳转到首页"
          })
        }else{
            alert("添加失败，请返回重新添加")
        }
      })
    },
    editSubmit() {
      console.log(11);
    }
  },
  watch: {
    birth(){
      console.log(this.editForm,birth)
    }
  }
};
</script>
<style lang="scss" scoped>
.right-panel {
  .app-main {
    .el-form {
      .el-input {
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none !important;
        }
      }
    }
  }
}
</style>


