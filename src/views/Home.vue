<template>
  <div id="home">
    <header class="header">
      <el-row>
        <el-col :span="5">
          <div>&nbsp;</div>
        </el-col>
        <el-col :span="14" class="title">
          <div style="width:30%" class="img">
            <img src="http://182.92.64.223:8080/zdsub/image/logo.png" alt />
          </div>
          <div style="width:70%">
            <ul>
              <li>首页</li>
              <li>援藏工作</li>
              <li>援藏政策</li>
              <li>援藏需求</li>
              <li>援藏路径</li>
              <li>援藏高校</li>
              <li>人员招聘</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="btn">
            <router-link to="/login" style="color:#ffffff">
              <el-button type="info" size="mini">登录</el-button>
            </router-link>
          </div>
        </el-col>
      </el-row>
    </header>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less'>
#home {
  .header {
    background-color: #2980b9;
    min-height: 60px;
    width: 100%;
    color: #ffffff;
    line-height: 60px;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      .img {
        display: flex;
        align-items: center;
      }

      ul {
        display: flex;
        li {
          flex: 1;
          cursor: pointer;
        }
      }
    }

    .btn {
      padding-left: 50px;
    }
  }
}
</style>