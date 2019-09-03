<template>
  <div>
    <div ref="div1" class="toolbar"></div>
    <div style="padding: 5px 0; color: #ccc">中间隔离带</div>
    <div ref="text" class="text">
      <!--可使用 min-height 实现编辑区域自动增加高度-->
      <p>请输入内容</p>
    </div>
    <button v-on:click="getContent">查看内容</button>
  </div>
</template>


<script>
import E from "wangeditor";
export default {
  name: "wangeditor",
  methods: {
    getContent: function() {
      console.log(this.editorContent);
    }
  },
  mounted() {
    var editor = new E(this.$refs.div1, this.$refs.div2);
    // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
    // editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
    editor.customConfig.uploadImgServer = "/upload"; // 上传图片到服务器
    editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    editor.create();
  }
};
</script>

<style scoped>
.toolbar {
  border: 1px solid #ccc;
}
.text {
  border: 1px solid #ccc;
  height: 600px;
}
</style>