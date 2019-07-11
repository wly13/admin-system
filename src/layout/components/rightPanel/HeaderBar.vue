<template>
  <el-header class="header-bar">
    <div class="login-out">
      <el-button @click="loginOut">退出登录</el-button>
    </div>
  </el-header>
</template>
<script>
export default {
  name:"HeaderBar",
  methods:{
    loginOut(){
      this.$store.commit("loginOut");
      this.$router.push("/login")
    }
  }
}
</script>


