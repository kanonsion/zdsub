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
      <el-form-item label="编号">
        <el-input v-model="policy.id" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="标题	">
        <el-input v-model="policy.title"></el-input>
      </el-form-item>
      <el-form-item label="重新上传">
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
import {
  findById_policy as get,
  update_policy as edit,
  upload,
  uploadRemove
} from "./../../../api/work";
import { Message } from "element-ui";
export default {
  data() {
    return {
      policy: {},
      rules: {},
      roleId: "",
      files: [],
      url: []
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { title, id } = this.policy;
          let url = this.url.join(",");
          console.log(url)
          this._edit({
            id,
            title,
            url
          });
        }
      });
    },
    async _edit(data) {
      let res = await edit(data);
      let { status } = res.data;
      if (status === 200) {
        Message.success("添加成功");
        this.$router.go(-1);
      }
    },
    back() {
      this.$router.go(-1);
    },
    async _get(id) {
      let res = await get(id);
      let { data } = res.data;
      this.policy = data;
      let urls = this.policy.url.split(",");
      for (const item of urls) {
        this.files.push({
          name: item,
          delname: item
        });
        this.url.push(item);
      }
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
    },
    async fileMove(file, filelist) {
      let res = await uploadRemove(file.delname);
      let index = this.url.findIndex(item=>{
        return item.delname === file.delname
      })
      this.url.splice(index, 1)
    },
    submitUpload() {
      this.$refs.upload.submit();
    }
  },
  mounted() {
    this._get(this.$route.params.id);
  }
};
</script>

<style lang="less">
</style>