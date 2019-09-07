<template>
  <div>
    <el-header id="header">
      
    </el-header>
    <tabnav />
  </div>
</template>

<script>
import tabnav from "./tabnav";
export default {
  components: {
    tabnav
  }
};
</script>

<style lang="less">
@import url('./../../../common/css/mixin.less');
#header {
  max-height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  .flex(space-between)
}
</style>