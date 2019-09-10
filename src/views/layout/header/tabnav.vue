<template>
  <div id="tabbox">
    <transition-group name="el-zoom-in-top" tag="ul" class="menu">
      <li
        v-for="(item, index) in this.$store.state.tabnavBox"
        :key="index"
        class="tabnav"
        :class="{ active: detail($route.path) === item.path }"
        @contextmenu.prevent="openMenu(item,$event,index)"
      >
        <router-link :to="item.path">{{item.name}}</router-link>
        <i @click="removeTab(item,index)" class="el-icon-error" v-if="index !== 0"></i>
      </li>
    </transition-group>

    <ul
      v-show="this.rightMenuShow"
      :style="{left:this.left+'px',top:this.top+'px'}"
      class="menuBox"
    >
      <li @click="removeTab($store.getters.tabNav)">
        <i class="fa fa-remove"></i>
        关闭
      </li>
      <li @click="removeOtherTab($store.getters.tabNav)">关闭其它</li>
      <li @click="removeAllTab">关闭所有</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightMenuShow: false,
      left: 0,
      top: 0
    };
  },
  methods: {
    removeTab(item) {
      this.$store.dispatch("removeTab", {
        item,
        fullPath: this.detail(this.$route.fullPath),
        router: this.$router
      });
    },
    removeOtherTab(item) {
      this.$store.dispatch("removeOtherTab", {
        item,
        fullPath: this.$route.fullPath,
        router: this.$router
      });
    },
    removeAllTab() {
      this.$store.dispatch("removeAllTab", this.$router);
    },
    openMenu(item, e, index) {
      if (index === 0) {
        return false;
      }
      this.rightMenuShow = true;
      (this.left = e.clientX + 10), (this.top = e.clientY);
      this.$store.dispatch("openMenu", item);
    },
    /* 处理key */
    detail(key) {
      if(key.indexOf("/", 8) === -1) return key
      return key.substring(0, key.indexOf("/", 8));
    }
  },
  watch: {
    rightMenuShow(value) {
      if (value) {
        document.body.addEventListener("click", () => {
          this.rightMenuShow = false;
        });
      } else {
        document.body.removeEventListener("click", () => {
          this.rightMenuShow = false;
        });
      }
    }
  },
  mounted() {
    let { fullPath, name } = this.$router.currentRoute;
    this.$store.dispatch("addTab", {
      path: this.detail(fullPath),
      name: name
    });
  }
};
</script>

<style lang="less">
@import url("./../../../common/css/mixin.less");
#tabbox {
  height: 42px;
  min-height: 42px;
  overflow: hidden;
  border-top: 1px solid #f6f6f6;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tabnav {
    display: inline-block;
    transition: 0.5s all;
  }
  .menu {
    display: flex;
    justify-content: flex-start;
    padding-left: 20px;
    flex-wrap: nowrap;
    overflow-x: auto;
    li {
      height: 30px;
      line-height: 31px;
      cursor: pointer;
      margin-top: 6px;
      margin-right: 5px;
      border: 1px solid #cccccc;
      overflow: hidden;
      &:not(:first-child) {
        padding-right: 10px;
        min-width: 80px;
      }
      a {
        display: inline-block;
        font-size: 12px;
        color: #999999;
        padding: 0 12px;
      }
    }
    li.active {
      background: #409eff;
      color: @fc;
      a {
        color: @fc;
      }
    }
  }
  .menuBox {
    margin: 0;
    background: #fff;
    z-index: 999;
    position: absolute;
    padding: 5px 0;
    border: 1px solid #cccccc;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 1px 6px 0 rgba(0, 0, 0, 0.3);
    display: block;
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #e1e6ea;
      }
    }
  }
}
</style>