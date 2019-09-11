<template>
  <div id="layout">
    <el-container>
      <layoutaside :collapse='collapse'></layoutaside>
      <el-container>
        <layoutheader @handleMenu="handleMenu"></layoutheader>
        <el-main id="elmain">
          <transition name="main" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
        <el-footer>
          <Bottom></Bottom>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import layoutaside from "./aside/aside";
import layoutheader from "./header/header";
import Bottom from "./footer/bottom";
export default {
  data() {
    return {
      collapse: false
    };
  },
  components: {
    layoutaside,
    layoutheader,
    Bottom
  },
  methods: {
    handleMenu() {
      this.collapse = !this.collapse;
    }
  }
};
</script>

<style lang="less">
</style>