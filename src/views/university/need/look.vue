<template>
  <div>
    <el-form
      :model="need"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="form"
      size="small"
    >
      <el-form-item label="需求编号">{{need.id}}</el-form-item>
      <el-form-item label="标题	">{{need.title}}</el-form-item>
      <el-form-item label="紧急状态">{{need.level=== 1 ? '紧急':'非常紧急' }}</el-form-item>
      <el-form-item label="学校">{{school.sch_name}}</el-form-item>
      <el-form-item label="详细信息">
        <div v-html="need.context"></div>
      </el-form-item>
      <el-form-item>
        <el-button @click="back">返回列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getNeedOne as get,
  editNeed as edit,
  schoolList
} from "./../../../api/school";
import { Message } from "element-ui";
import wangeditor from "./../../../components/wangeditor_single";
var validateTelephone = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入电话号码"));
  } else {
    if (!/^1[3456789]\d{9}$/.test(value)) {
      callback(new Error("请输入正确的电话号码"));
    }
    callback();
  }
};
export default {
  data() {
    return {
      need: {},
      schoolList: [],
      school: {},
      rules: {
        telephone: [{ validator: validateTelephone, trigger: "blur" }]
      },
      schId: ""
    };
  },
  methods: {
    catchData(val) {
      this.work.context = val;
    },
    back() {
      this.$router.go(-1);
    },
    async _get(id) {
      let res = await get(id);
      let { data } = res.data;
      this.need = data;
      this.school = data.school;
      console.log(res);
    }
  },
  mounted() {
    this._get(this.$route.params.id);
    this._schoolList();
  },
  components: {
    wangeditor
  }
};
</script>

<style lang="less">
</style>