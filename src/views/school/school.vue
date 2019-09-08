<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="学校名称" prop="name" style="width:400px">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getSchool } from "./../../api/school";
export default {
  data() {
    return {
      list: [],
      ruleForm: {
        name
      },
      rules: {
        name: [
          { required: true, message: "请输入学校名称", trigger: "blur" },
        ]
      }
    };
  },
  methods: {
    async _getSchool() {
      let res = await getSchool({
        pageNo: 1,
        pageSize: 2
      });
      let {
        data: { resultList }
      } = res.data;
      this.list = resultList;
    }
  },
  mounted() {
    this._getSchool();
  }
};
</script>

<style lang="less">
</style>