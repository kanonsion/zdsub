<template>
  <div id="home">
    <header class="navwrapper">
      <div class="logo">
        <img src="http://182.92.64.223:8080/zdsub/image/logo.png" alt />
      </div>
      <div class="nav">
        <ul>
          <li @click="jump('/')">首页</li>
          <li @click="jump('/home/work')">援藏工作</li>
          <li @click="jump('/home/policy')">援藏政策</li>
          <li @click="jump('/home/need')">援藏需求</li>
          <li @click="jump('/home/process')">援藏路径</li>
          <li @click="jump('/home/school')">援藏高校</li>
          <li @click="jump('/home/adver')">人员招聘</li>
        </ul>
      </div>
      <div class="btn">
        <el-button type="info" plain>登录</el-button>
      </div>
    </header>
    <!-- 遮罩层 -->
    <section class="shade"></section>
    <section class="topimg">
      <el-carousel height="700px" direction="vertical">
        <el-carousel-item v-for="item in imgs" :key="item">
          <img :src="item" alt />
        </el-carousel-item>
      </el-carousel>
    </section>
    <!--  -->
    <section class="cbg"></section>
    <!-- 可能会变动 -->
    <section class="news">
      <div class="main">
        <!-- 大标题 -->
        <h2>
          <span></span>
          新闻
          <span></span>
        </h2>
        <!-- 布局 -->
        <ul>
          <!-- 内容 -->
          <li>
            <div class="date">
              2019年
              <p />5月12日
            </div>
            <div class="content">
              <span class="title">西藏大学2019年西藏自治区自然科学基金项目申报和评审</span>
              <div
                class="text"
              >2019年度西藏自治区自然科学基金项目申报已开始，为更好落实西藏自治区科技厅《关于组织申报2019年度自治区自然科学基金项目的通知》文件精神，结合我校科研实际需求，并保证我校2019年西藏自治区自然科学基金项目的有效申报及合理评审，现将西藏大学2019年度自治区自然科学基金项目申报和评审事宜通知如下：</div>
            </div>
          </li>
          <li>
            <div class="date">
              2019年
              <p />5月12日
            </div>
            <div class="content">
              <span class="title">西藏大学2019年西藏自治区自然科学基金项目申报和评审</span>
              <div
                class="text"
              >2019年度西藏自治区自然科学基金项目申报已开始，为更好落实西藏自治区科技厅《关于组织申报2019年度自治区自然科学基金项目的通知》文件精神，结合我校科研实际需求，并保证我校2019年西藏自治区自然科学基金项目的有效申报及合理评审，现将西藏大学2019年度自治区自然科学基金项目申报和评审事宜通知如下：</div>
            </div>
          </li>
          <li>
            <div class="date">
              2019年
              <p />5月12日
            </div>
            <div class="content">
              <span class="title">西藏大学2019年西藏自治区自然科学基金项目申报和评审</span>
              <div
                class="text"
              >2019年度西藏自治区自然科学基金项目申报已开始，为更好落实西藏自治区科技厅《关于组织申报2019年度自治区自然科学基金项目的通知》文件精神，结合我校科研实际需求，并保证我校2019年西藏自治区自然科学基金项目的有效申报及合理评审，现将西藏大学2019年度自治区自然科学基金项目申报和评审事宜通知如下：</div>
            </div>
          </li>
        </ul>
      </div>
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
export default {
  data() {
    return {
      imgs: [
        "http://pic1.win4000.com/wallpaper/2019-05-17/5cde49ac0fff5.jpg",
        "http://pic1.win4000.com/wallpaper/2019-05-17/5cde49accc7eb.jpg",
        "http://pic1.win4000.com/wallpaper/d/5991569950166.jpg",
        "http://pic1.win4000.com/wallpaper/0/598d411133c78.jpg",
        "http://pic1.win4000.com/wallpaper/0/598d41150d714.jpg",
        "http://pic1.win4000.com/wallpaper/0/598d4123d60df.jpg",
        "http://pic1.win4000.com/wallpaper/2019-05-17/5cde49b2f1c99.jpg"
      ]
    };
  },
  methods: {
    jump(url) {
      console.log(url);
      this.$router.push(url);
    }
  }
};
</script>

<style lang="less">
#home {
  position: relative;
  .navwrapper {
    position: absolute;
    width: 100%;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #2c3e50;
    .logo {
      position: absolute;
      width: 180px;
      left: 60px;
    }
    .nav {
      padding-right: 35px;
      padding-top: 30px;
      padding-bottom: 30px;
      color: #ffffff;
      width: 50%;
      ul {
        display: flex;
        flex-wrap: nowrap;
        li {
          flex: 1;
          display: block;
          cursor: pointer;
          height: 45px;
          line-height: 45px;
          text-align: center;
        }
        li:hover {
          background: #34495e;
          border-top: 1px solid #f1c40f;
        }
      }
    }
    .btn {
      margin-left: 100px;
    }
  }
  .shade {
    width: 100%;
    z-index: 9;
    background: #7f8c8d;
    opacity: 0.2;
    width: 100%;
    height: 105px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .topimg {
    z-index: 0;
  }
  .cbg {
    background: url(http://img.zcool.cn/community/01c803554b41ae000001bf72a77af3.jpg@2o.jpg);
    position: absolute;
    z-index: 2;
    transform: rotate(-3deg);
    transform-origin: center top;
    -ms-transform: rotate(-3deg);
    -ms-transform-origin: center top;
    height: 100%;
    width: 200%;
    right: -5px;
    top: 660px;
  }
  .news {
    position: absolute;
    z-index: 10;
    width: 100%;
    .main {
      color: #ffffff;
      width: 80%;
      margin: auto;
      h2 {
        text-align: center;
        font-size: 22px;
        span {
          height: 1px;
          width: 60px;
          background: #fff;
          display: inline-block;
          vertical-align: middle;
          opacity: 0.5;
          margin: 0 20px;
        }
      }
      ul {
        margin-top: 30px;
        display: flex;
        cursor: pointer;
        li {
          width: 27%;
          height: 70px;
          padding: 5px 30px 30px 20px;
          margin-right: 30px;
          overflow: hidden;
          border-left: 1px solid #bdc3c7;
          display: -webkit-box;
          .date {
            margin-right: 30px;
            p {
              padding-bottom: 10px;
            }
          }
          .content {
            width: 80%;
            .title {
              font-size: 16px;
              &:hover {
                color: #e67e22;
              }
            }
            .text {
              height: 60px;
              text-overflow: ellipsis;
              overflow: hidden;
              font-size: 12px;
              color: #7f8c8d;
              line-height: 20px;
              margin-top: 12px;
            }
          }
        }
      }
    }
  }
  .footer {
    width: 100%;
    height: 200px;
    position: absolute;
    top: 1280px;
    background: url(https://www.tsinghua.edu.cn/publish/thu2018/images/footer.jpg);
    background-size: cover;
    .copyright {
      position: absolute;
      z-index: 10;
      width: 80%;
      padding-left: 10%;
      top: 120px;
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