<template>
  <div>
    <el-form
      :model="policy"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="form"
      size="small"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="policy.title"></el-input>
      </el-form-item>
      <el-form-item label="上传">
        <div>
          <el-upload
            class="upload"
            drag
            ref="upload"
            accept
            :before-upload="beforeAvatarUpload"
            action
            :auto-upload="false"
            :http-request="_upload"
            :on-remove="fileMove"
            :multiple="true"
            :file-list="files"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
          <el-button
            style="margin-top:10px"
            size="small"
            type="success"
            @click="submitUpload"
          >上传到服务器</el-button>
          <div class="el-upload__tip" slot="tip">文件大小不能超过19M</div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="back">返回列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { upload, uploadRemove, add_policy as add } from "@/api/work";
import { Message } from "element-ui";
export default {
  data() {
    return {
      policy: {},
      schname: "",
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }]
      },
      token: {},
      files: [],
      url: []
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { title } = this.policy;
          let url = this.url.join(",");
          this._add({
            title,
            url
          });
        }
      });
    },
    async _add(data) {
      let res = await add(data);
      let { status } = res.data;
      if (status === 200) {
        Message.success("添加成功");
        this.$router.go(-1);
      }
    },
    back() {
      this.$router.go(-1);
    },
    /* 上传 */
    beforeAvatarUpload(file) {
      let size = file.size / 1024 / 1024 < 19;
      if (!size) {
        Message.error("文件大小不能超过19M");
        return false;
      }
    },
    async _upload(content) {
      let formData = new FormData();
      formData.append("file", content.file);
      let res = await upload(formData);

      let { msg } = res.data;
      let arr = msg.split("/");
      let delname = arr[arr.length - 1];
      this.url.push(delname);
      console.log(this.url);
      this.files.push({
        uid: content.file.uid,
        name: content.file.name,
        delname
      });
    },
    async fileMove(file, filelist) {
      let res = await uploadRemove(file.delname);
    },
    submitUpload() {
      this.$refs.upload.submit();
    }
  },
  mounted() {
    let Authorization = localStorage.token;
    this.token = {
      Authorization
    };
  }
};
</script>

<style lang="less">
.el-select-dropdown {
  z-index: 99999 !important;
}
</style>