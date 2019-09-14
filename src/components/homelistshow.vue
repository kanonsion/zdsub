<template>
  <div id="homelistshow">
    <homeheader />
    <section class="main">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
      <!--  -->
      <div class="context">
        <div class="detail">
          <div class="title">
            <h2>关于IPv6测试校园网断网的通知</h2>
          </div>
          <div class="text">校园网用户：</div>
        </div>
        <div class="more">
          <p>更多</p>
          <ul>
            <li>西藏大学2019年西藏自治区自然科学基金项目申报和评审</li>
            <li>西藏大学2019年西藏自治区自然科学基金项目申报和评审</li>
          </ul>
        </div>
      </div>
    </section>

    <!--  -->
    <homefooter/>
  </div>
</template>

<script>
import homeheader from "./homeheader";
import homefooter from "./homefooter";
export default {
  props:['data'],
  components: {
    homeheader,
    homefooter
  },
  mounted() {
    console.log(this.route)
  },
};
</script>

<style lang="less">
@import url('./../common/css/mixin.less');
#homelistshow {
  .main {
    .center(60%);
    margin-top: 40px;
    .breadcrumb {
      font-size: 16px;
    }
    .context {
      margin: 40px 20px 20px 20px;
      .flex(space-between);
      min-height: 600px;
      .detail {
        width: 70%;
        .title {
          font-size: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid @grey;
        }
        .text {
          padding-top: 20px;
        }
      }
      .more {
        width: 20%;
        p {
          font-size: 24px;
          padding-bottom: 20px;
        }
        ul {
          li {
            width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            font-size: 14px;
            padding-bottom: 15px;
          }
        }
      }
    }
  }
}
</style>