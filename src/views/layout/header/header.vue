<template>
  <div>
    <el-header id="header">
      <span @click="$emit('handleMenu')">
        <i class="el-icon-s-fold"></i>
      </span>
      <el-dropdown @command="handleCommand" trigger="click">
        <span>
          {{name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home">回到首页</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <tabnav />
  </div>
</template>

<script>
import { logout } from "@/api/home";
import { Message } from "element-ui";
import tabnav from "./tabnav";
export default {
  data() {
    return {
      name: ""
    };
  },
  props: ["handleMenu"],
  components: {
    tabnav
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "home":
          this.$router.push("/home");
          break;

        case "exit":
          this._logout();
          break;
      }
    },
    async _logout() {
      let res = await logout(localStorage.token);
      console.log(res);
      let { status, msg } = res.data;
      if (status === 200) {
        Message.success(msg);
        localStorage.token = "";
        this.$router.push({ path: "/home" });
      }
    }
  },
  mounted() {
    this.name = localStorage.user_name;
  }
};
</script>

<style lang="less">
@import url("./../../../common/css/mixin.less");
#header {
  max-height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  .flex(space-between);
  .el-dropdown {
    cursor: pointer;
  }
}
</style>