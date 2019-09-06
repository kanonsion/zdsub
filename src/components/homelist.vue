<template>
  <div id="homelist">
    <homeheader />
    <!--  -->
    <section class="banner">
      <div class="banner_img"></div>
    </section>

    <section class="main">
      <!-- 列表 -->
      <div class="list">
        <ul>
          <!--  -->
          <li @click="()=>{$router.push('/home')}">
            <span>关于IPv6测试校园网断网的通知</span>
            <span>2019-08-31 &nbsp; 10:51:58</span>
          </li>
          <li>
            <span>关于IPv6测试校园网断网的通知</span>
            <span>2019-08-31 &nbsp; 10:51:58</span>
          </li>
          <li>
            <span>关于IPv6测试校园网断网的通知</span>
            <span>2019-08-31 &nbsp; 10:51:58</span>
          </li>
        </ul>
      </div>
      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="1000" class="pagination"></el-pagination>
    </section>

    <!-- footer  -->
    <homefooter />
  </div>
</template>

<script>
import homeheader from "./homeheader";
import homefooter from "./homefooter";
export default {
  components: {
    homeheader,
    homefooter
  },
  props: {}
};
</script>

<style lang="less">
#homelist {
  margin: -20px;
  .banner {
    background-color: #ecf0f1;
    height: 270px;
    margin-top: 20px;
    .banner_img {
      width: 80%;
      height: 100%;
      background: url(http://pic1.win4000.com/wallpaper/0/598d411133c78.jpg)
        no-repeat;
      background-size: cover;
      background-position-y: bottom;
      margin-left: 10%;
    }
  }
  .main {
    width: 60%;
    margin: auto;
    margin-top: 20px;
    .list {
      margin-top: 40px;
      ul {
        li {
          width: 100%;
          margin: auto;
          height: 40px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #bdc3c7;
          cursor: pointer;
          color: #999;
          margin-bottom: 40px;
          span {
            padding: 0 40px 0 40px;
          }
        }
      }
    }
    .pagination {
      text-align: right;
    }
  }
}
</style>