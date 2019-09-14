<template>
  <div id="homelistshow">
    <homeheader />
    <section class="main">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>动态内容</el-breadcrumb-item>
      </el-breadcrumb>
      <!--  -->
      <div class="context">
        <div class="detail">
          <div class="title">
            <h2>{{data.title || data.path_name || data.sch_name}}</h2>
          </div>
          <div class="text" v-html="data.context || data.message" v-if="!data.path_name"></div>
          <div style="display:flex;flex-wrap: wrap" v-else>
            <div :key="tag" v-for="tag in tags" class="tag">
              <div class="center"></div>
              <div class="to_right"></div>
              <el-tag :disable-transitions="true">{{tag}}</el-tag>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--  -->
    <homefooter />
  </div>
</template>

<script>
import homeheader from "./homeheader";
import homefooter from "./homefooter";
export default {
  props: ["data"],
  components: {
    homeheader,
    homefooter
  },
  computed: {
    tags() {
      return this.data.context.split("|");
    }
  }
};
</script>

<style lang="less">
@import url("./../common/css/mixin.less");
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