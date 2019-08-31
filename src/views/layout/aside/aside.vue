<template>
  <div>
    <el-aside id="asideNav">
      <el-menu
        class="el-menu-vertical"
        background-color="#03152A"
        text-color="rgba(255,255,255,.7)"
        active-text-color="#ffffff"
        :collapse-transition="true"
        :unique-opened="true"
        :router="true"
        :default-active="$route.path"
        @select="selectmenu"
      >
        <!--  -->
        <el-menu-item index="/layout/index">
          <i class="el-icon-setting"></i>
          <span slot="title">主页</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item
            v-for="(item, index) in this.$store.state.routers"
            :key="index"
            :index="item.path"
          >{{item.name}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import { constants } from "crypto";
export default {
  methods: {
    selectmenu(key) {
      let router = this.$store.state.routers;
      let name = "";
      /* let navTitle = function(path, routerARR) {
        for (let i = 0; i < routerARR.length; i++) {
          if (routerARR[i].children.length > 0 || routerARR[i].path === path) {
            if (
              routerARR[i].path === path &&
              routerARR[i].children.length < 1
            ) {
              name = routerARR[i].name;
              break;
            }
            // 递归查找
            navTitle(path, routerARR[i].children);
          }
        }
        return name;
      }; */
      let navTitle = function(path, routerARR) {
        for (let i = 0; i < routerARR.length; i++) {
          if (routerARR[i].path === path) {
            name = routerARR[i].name;
          }
        }
      };
      navTitle(key, router);
      this.$store.dispatch("addTab", {
        path: `${key}`,
        name: name
      });
    }
  },
  watch: {
    // 监听浏览器直接输入路由，将此路由添加到tabnavBox
    "$route.path": function(key) {
      this.selectmenu(key);
    }
  }
};
</script>

<style lang="less">
#asideNav {
  width: auto !important;
  display: flex;
  flex-direction: column;
  border-right: solid 1px #e6e6e6;
  height: 100vh;
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
    overflow-y: scroll;
  }
  .el-menu {
    flex: 1;
    overflow: inherit;
    border-right: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .fa {
      vertical-align: middle;
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
    .el-menu-item {
      background-color: #020f1d !important;
      border-bottom: 1px solid #020f1d;
      &:hover {
        color: #ffffff !important;
        background-color: #375573 !important;
      }
    }
    .el-menu-item.is-active {
      background-color: #56a9ff !important;
    }
    .is-opened > .el-submenu__title > .el-icon-arrow-down {
      color: #ffffff;
      font-weight: 500;
      font-size: 18px;
    }
  }
}
</style>