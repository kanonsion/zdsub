<template>
  <div>
    <el-aside id="asideNav">
      <el-menu
        class="el-menu-vertical"
        background-color="#03152A"
        text-color="rgba(255,255,255,.7)"
        active-text-color="#ffffff"
        :collapse-transition="true"
        :unique-opened="true"
        :router="true"
        :default-active="detail($route.path)"
        @select="selectmenu"
        :collapse="collapse"
      >
        <!--  -->
        <el-submenu v-for="(item, index) in list" :key="index" :index="item.id">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.menu_name}}</span>
          </template>
          <el-menu-item
            v-for="children in item.childrens"
            :key="children.id"
            :index="'/layout/'+children.menu_url"
          >{{children.menu_name}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import { getMenu } from "./../../../api/layout";
export default {
  data() {
    return {
      list: [],
      routers: []
    };
  },
  props: ["collapse"],
  methods: {
    selectmenu(key) {
      let router = this.$store.state.routers;
      let name = "";
      /* let navTitle = function(path, routerARR) {
        for (let i = 0; i < routerARR.length; i++) {
          if (routerARR[i].children.length > 0 || routerARR[i].path === path) {
            if (
              routerARR[i].path === path &&
              routerARR[i].children.length < 1
            ) {
              name = routerARR[i].name;
              break;
            }
            // 递归查找
            navTitle(path, routerARR[i].children);
          }
        }
        return name;
      }; */
      let navTitle = function(path, routerARR) {
        for (let i = 0; i < routerARR.length; i++) {
          if (routerARR[i].path === path) {
            name = routerARR[i].name;
          }
        }
      };
      navTitle(this.detail(key), router);
      this.$store.dispatch("addTab", {
        path: `${this.detail(key)}`,
        name: name
      });
    },
    async _getMenu() {
      let res = await getMenu();
      let { status, data } = res.data;
      this.list = data;
      let icons = ['el-icon-menu','el-icon-school','el-icon-s-release','el-icon-s-custom']
      this.list.forEach((item,index) => {
        item['icon'] = icons[index]
      });
      this.getRouters(data);
    },
    /* 处理key */
    detail(key) {
      if (key.indexOf("/", 8) === -1) return key;
      return key.substring(0, key.indexOf("/", 8));
    },
    getRouters(data) {
      let _this = this;
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].childrens.length; j++) {
          let item = data[i].childrens[j];
          _this.routers.push({
            path: "/layout/" + item.menu_url,
            name: item.menu_name
          });
        }
      }
      _this.$store.dispatch("addRouters", _this.routers);
    }
  },
  watch: {
    // 监听浏览器直接输入路由，将此路由添加到tabnavBox
    "$route.path": function(key) {
      this.selectmenu(this.detail(key));
    }
  },
  mounted() {
    this._getMenu();
  }
};
</script>

<style lang="less">
@import url("./../../../common/css/mixin.less");
#asideNav {
  width: auto !important;
  display: flex;
  flex-direction: column;
  border-right: solid 1px #e6e6e6;
  min-height: 100vh;
  height: 100%;
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
    overflow-y: scroll;
  }
  .el-menu {
    flex: 1;
    overflow: inherit;
    border-right: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .fa {
      vertical-align: middle;
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
    .el-menu-item {
      background-color: #020f1d !important;
      border-bottom: 1px solid #020f1d;
      &:hover {
        color: @fc !important;
        background-color: #375573 !important;
      }
    }
    .el-menu-item.is-active {
      background-color: #56a9ff !important;
    }
    .is-opened > .el-submenu__title > .el-icon-arrow-down {
      color: @fc;
      font-weight: 500;
      font-size: 18px;
    }
  }
}
</style>