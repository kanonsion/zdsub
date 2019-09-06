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
          <li>
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

    <!--  -->
    <footer class="footer">
      <div class="copyright">
        <div class="context">@版权所有</div>
      </div>
    </footer>
  </div>
</template>

<script>
import homeheader from "./homeheader";
export default {
  components: {
    homeheader
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
  .footer {
    margin-top: 20px;
    background-color: #34495e;
    width: 100%;
    height: 80px;
    .copyright {
      width: 80%;
      padding-left: 10%;
      padding-top: 20px;
      .context {
        border-top: 1px solid #7f8c8d;
        padding-top: 20px;
        margin-top: 10px;
        font-size: 13px;
        color: #95a5a6;
      }
    }
  }
}
</style>