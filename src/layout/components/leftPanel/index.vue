<template>
  <div class="left-panel">
    <el-scrollbar>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <template v-for="item in $router.options.routes">
          <el-menu-item :key="item.path" :index="item.path" v-if="item.noChild">
            <span class="svg-container">
              <svg-icon :icon-class="$t(item.icon)"/>
            </span>
            <span class="nav-title" slot="title">{{$t(item.title)}}</span>
          </el-menu-item>
          <el-submenu :key="item.path" :index="item.path" v-else-if="!item.hidden && !item.noChild">
            <template slot="title">
              <span class="svg-container">
                <svg-icon :icon-class="$t(item.icon)"/>
              </span>
              <span class="nav-title">{{$t(item.title)}}</span>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :index="child.path"
              :key="child.path"
            >{{child.title}}</el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
const navData = require("@/assets/navBar.json");
export default {
  name: "LeftPanel",
  data() {
    return {
      navBar: navData.navBar
    };
  }
};
</script>


