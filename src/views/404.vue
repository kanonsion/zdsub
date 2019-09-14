<template>
  <div id="notfound">
    <el-button @click="click()">返回首页</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    click() {
      this.$router.push("/");
    }
  }
};
</script>
<style lang="less">
#notfound {
  background-image: url("../../public/images/404.png");
  height: 100vh;
  button {
    position: absolute;
    top: 55%;
    left: 55%;
  }
}
</style>