<template>
  <div>
    <el-form
      :model="adver"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="form"
      size="small"
    >
      <el-form-item label="需求编号">
        <el-input v-model="adver.id" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="adver.title"></el-input>
      </el-form-item>
      <el-form-item label="学校">
        {{school.sch_name}}
      </el-form-item>
      <el-form-item label="详细信息">
        <wangeditor :catchData="catchData" :content="adver.context" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="back">返回列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import wangeditor from "./../../../components/wangeditor_single";
import { get, edit } from "./../../../api/advertise";
import { Message } from "element-ui";
export default {
  data() {
    return {
      adver: {},
      school: {},
      rules: {
        title: [{ required: true, message: "请输入学校名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    catchData(val) {
      this.adver.context = val;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { id, title, context } = this.adver;
          let { id: schId } = this.school;
          this._edit({
            id,
            title,
            context,
            schId
          });
        }
      });
    },
    async _edit(data) {
      let res = await edit(data);
      let { status } = res.data;
      if (status === 200) {
        Message.success("修改成功");
        this.$router.go(-1);
      }
    },
    back() {
      this.$router.go(-1);
    },
    async _get(id) {
      let res = await get(id);
      let { data } = res.data;
      this.adver = data;
      this.school = data.school;
    }
  },
  mounted() {
    this._get(this.$route.params.id);
  },
  components: {
    wangeditor
  }
};
</script>

<style lang="less">
</style>