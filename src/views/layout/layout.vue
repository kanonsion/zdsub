<template>
  <div id="layout">
    <el-container>
      <layoutaside></layoutaside>
      <el-container>
        <layoutheader></layoutheader>
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
  components: {
    layoutaside,
    layoutheader,
    Bottom
  }
};
</script>

<style lang="less">
</style>