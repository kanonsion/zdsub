<template>
  <div id="homeheader">
    <header class="header">
      <div class="main">
        <div class="top">
          <img src="./../../public/images/logo1.png" alt />
        </div>
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
    </header>
  </div>
</template>

<script>
export default {
  methods: {
    jump(url) {
      console.log(url);
      this.$router.push(url);
    }
  }
};
</script>

<style lang='less'>
@import url('./../common/css/mixin.less');
#homeheader {
  .header {
    background: @fc url(https://www.tsinghua.edu.cn/publish/newthu/newthu_cnt/images/bg.jpg)
      repeat-x top;
    height: 120px;
    .main {
      height: 100%;
      .center(70%);
      .top {
        height: 70%;
        border-bottom: 1px solid @darkblue;
        img{
          height: 100%;
        }
      }
      ul {
        height: 29%;
        margin-top: 5px;
        display: flex;
        flex-wrap: nowrap;
        li {
          padding-top: 10px;
          flex: 1;
          cursor: pointer;
          display: block;
          width: 20px;
          text-align: center;
          &:hover{
            background-color: @blue
          }
        }
      }
    }
  }
}
</style>