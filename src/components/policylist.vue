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
          <li v-for="(item, index) in list" :key="index" @click="download(item.id)">
            <span>{{item.title || item.path_name || item.sch_name}}</span>
            <span>{{item.uptate_time || item.update_time}}</span>
          </li>
        </ul>
      </div>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :page-sizes="[3,6,9,12]"
        :page-size="pagination.size || 3"
        layout="sizes, prev, pager, next"
        :total="pagination.total"
        class="pagination"
      ></el-pagination>
    </section>

    <!-- footer  -->
    <homefooter />
  </div>
</template>

<script>
import homeheader from "./homeheader";
import homefooter from "./homefooter";
import { policy, get_policy as get } from "@/api/home";
import { download } from "@/api/home";
export default {
  components: {
    homeheader,
    homefooter
  },
  props: [
    "list",
    "pagination",
    "handleSizeChange",
    "handleCurrentChange",
    "router"
  ],
  methods: {
    async download(id) {
      let res = await get(id);
      let { url } = res.data.data;
      console.log(url)
      this.handleDownload(url.split(",")[0]);
    },
    handleSizeChange1(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange1(val) {
      this.$emit("handleCurrentChange", val);
    },
    handleDownload(url) {
      debugger
      download(url)
        .then(res => {
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(
            new Blob([res.data], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            })
          );
          link.target = "_blank";
          let fileName = window.decodeURI(
            res.headers["content-disposition"].split("=")[1]
          );
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(err => {});
    }
  },
  mounted() {}
};
</script>

<style lang="less">
@import url("./../common/css/mixin.less");
#homelist {
  .banner {
    background-color: @bc;
    height: 270px;
    margin-top: 20px;
    .banner_img {
      width: 80%;
      .bg("http://pic1.win4000.com/wallpaper/0/598d411133c78.jpg", 100%);
      background-size: cover;
      background-position-y: bottom;
      margin-left: 10%;
    }
  }
  .main {
    .center(60%);
    margin-top: 20px;
    .list {
      margin-top: 40px;
      min-height: 300px;
      ul {
        li {
          .center(100%);
          height: 40px;
          .flex(space-between);
          border-bottom: 1px solid @grey;
          cursor: pointer;
          color: @grey;
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