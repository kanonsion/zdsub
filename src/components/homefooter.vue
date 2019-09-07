<template>
  <div id="homefooter">
    <footer class="footer">
      <div class="copyright">
        <div class="context">@版权所有</div>
      </div>
    </footer>
  </div>
</template>

<style lang="less">
@import url('./../common/css/mixin.less');
#homefooter {
  .footer {
    margin-top: 20px;
    background-color: @darkblue;
    width: 100%;
    height: 80px;
    .copyright {
      .center(80%);
      padding-top: 20px;
      .context {
        border-top: 1px solid @grey;
        padding-top: 20px;
        margin-top: 10px;
        font-size: 13px;
        color: @grey;
      }
    }
  }
}
</style>