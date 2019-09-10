<template>
  <div>
    <el-form :model="process" :rules="rules" label-width="100px" size="small">
      <el-form-item label="标题:" prop="path_name">
        <el-input v-model="process.path_name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="节点:" prop="name" class="name-input" inile="true">
        <el-input
          v-model="node"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button type="primary" @click="handleInputConfirm">增加</el-button>
        <el-button type="success" @click="_edit">提交</el-button>
      </el-form-item>
    </el-form>

    <div style="display:flex;flex-wrap: wrap">
      <div :key="tag" v-for="tag in process.context" class="tag">
        <div class="center"></div>
        <div class="to_right"></div>
        <el-tag closable :disable-transitions="true" @close="handleClose(tag)">{{tag}}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
import { get, edit } from "./../../../api/work";
import { Message } from "element-ui";
export default {
  data() {
    return {
      process: {},
      node: "",

      rules: {
        path_name: [{ required: true, message: "请输入标题", trigger: "blur" }]
      }
    };
  },
  methods: {
    catchData(val) {
      this.process.context = val;
    },
    async _edit() {
      let { id, path_name, context, sch_id } = this.process;
      context = this.detailContext(context);
      let res = await edit({ id, path_name, context, sch_id });
      let { status } = res.data;
      if (status === 200) {
        Message.success("修改成功");
        this.$router.go(-1);
      }
    },
    detailContext(arr) {
      return arr.join("|");
    },
    back() {
      this.$router.go(-1);
    },
    async _get(id) {
      let res = await get(id);
      let { data } = res.data;
      this.process = data;
      this.process.context = this.process.context.split("|");
    },

    /* 删除tag */
    handleClose(tag) {
      let { context } = this.process;
      context.splice(context.indexOf(tag), 1);
    },
    handleInputConfirm() {
      let { node } = this;
      if (node) {
        this.process.context.push(node);
      }
      this.node = "";
    }
  },
  mounted() {
    this._get(this.$route.params.id);
  }
};
</script>

<style lang="less">
.center {
  height: 10px;
  width: 50px;
  background: #2ecc71;
  opacity: 0.7;
}
.to_right {
  width: 0;
  height: 0;
  border-left: 30px solid #2ecc71;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  opacity: 0.7;
}
.tag {
  display: flex !important;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
}
.el-tag {
  margin: 5px;
}
</style>