<template>
  <div class="login-container">
    <!-- rules表单验证规则 model表单数据对象 -->
    <el-form class="login-form" :rules="loginRules" :ref="loginForm" :model="loginForm">
      <div class="title-container">
        <h3 class="title">{{title}}</h3>
      </div>
      <!-- prop 表单域 model字段，用于表单验证 -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          v-model="loginForm.username"
          type="text"
          :placeholder="login.username"
          name="username"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          :placeholder="login.password"
          auto-complete="on"
        ></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"></svg-icon>
        </span>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click="Login"
      >{{login.Login}}</el-button>

      <div style="position:relative; margin-top:30px">
        <el-button class="thirdparty-button" type="primary">{{ login.thirdparty }}</el-button>
      </div>

      <div class="dialog">
        <el-alert type="error" description="用户名或者密码错误" show-icon v-show="errorDialog"></el-alert>
        <el-alert type="warning" description="用户名或者密码不能为空" show-icon v-show="warnDialog"></el-alert>
      </div>
    </el-form>
  </div>
</template>
<script>
import { setTimeout } from "timers";
export default {
  name: "Login",
  data() {
    const validUserName = (rule, value, callback) => {
      // console.log("value=" + value);
      if (value == "") {
        callback(new Error("姓名不能为空"));
      } else {
        callback();
      }
    };
    const validPassWord = (rule, value, callback) => {
      // console.log("length = " + value.length);
      if (value.length == 0) {
        callback(new Error("密码不能为空"));
      } else if (value.length > 0 && value.length < 6) {
        callback(new Error("密码不能小于6位"));
      } else {
        callback();
      }
    };
    return {
      title: "系统登陆",
      loginForm: {
        username: "",
        password: ""
      },
      login: {
        username: "账号",
        password: "密码",
        thirdparty: "第三方登陆",
        Login: "登录"
      },
      passwordType: "password",
      loading: false,
      loginRules: {
        // validator 是一个function
        // 如果直接输出内容：message:'xxx'来替代validator
        username: [
          { required: true, trigger: "blur", validator: validUserName }
        ],
        password: [
          { required: true, trigger: "blur", validator: validPassWord }
        ]
      },
      errorDialog: false,
      warnDialog: false
      // redirect: undefined
    };
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    Login() {
      if (this.loginForm.username == "" || this.loginForm.password == "") {
        this.warnDialog = true;
      } else {
        this.warnDialog = false;
        this.$axios({
          method: "post",
          changeOrigin: true,
          url: "http://localhost:8080/api/login",
          // url:"/api/health/list",
          data: {
            username: this.loginForm.username,
            password: this.loginForm.password
          }
        }).then(result => {
          if (result.data == "") {
            this.errorDialog = true;
          } else {
            let user = {
              username: result.data.name
            };
            this.$store.commit("Login", user);
            this.$router.push("/");
          }
        });
      }
    }
  },
  watch: {
    //实时监听属性变化
    warnDialog(warnDialog) {
      // console.log(warnDialog);
      if (warnDialog) {
        setTimeout(() => {
          this.warnDialog = false;
        }, 3000);
      }
    }
  }
};
</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;

    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    box-sizing: border-box;
  }

  // .tips {
  //   font-size: 14px;
  //   color: #fff;
  //   margin-bottom: 10px;

  //   span {
  //     &:first-of-type {
  //       margin-right: 16px;
  //     }
  //   }
  // }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    box-sizing: border-box;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    // .set-language {
    //   color: #fff;
    //   position: absolute;
    //   top: 3px;
    //   font-size: 18px;
    //   right: 0px;
    //   cursor: pointer;
    // }
  }
  .dialog {
    position: absolute;
    top: 10%;
    left: 30%;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
