<template>
  <div>
    <el-form
      :model="work"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="form"
      size="small"
    >
      <el-form-item label="标题" prop="title">
        {{work.title}}
      </el-form-item>
      <el-form-item label="学校">{{school.sch_name}}</el-form-item>
      <el-form-item label="详细信息">
        <div v-html="work.context"></div>
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
import { get_work as get, edit_work as add } from "./../../../api/work";
import { schoolList } from "./../../../api/school";
import { Message } from "element-ui";
export default {
  data() {
    return {
      work: {},
      list: [],
      school: {},
      schname: "",
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }]
      }
    };
  },
  methods: {
    catchData(val) {
      this.work.context = val;
    },
    async _get(id) {
      let res = await get(id);
      let { data } = res.data;
      this.work = data;
      this.school = data.school;
      console.log(this.school);
    },
    back() {
      this.$router.go(-1);
    }
  },
  components: {
    wangeditor
  },
  mounted() {
    this._get(this.$route.params.id);
  }
};
</script>

<style lang="less">
.el-select-dropdown {
  z-index: 99999 !important;
}
</style>