<template>
  <div>
    <el-form :model="need" ref="ruleForm" label-width="100px" class="form" size="small">
      <el-form-item label="学校编号:">{{need.id}}</el-form-item>
      <el-form-item label="标题:" >{{need.title}}</el-form-item>
      <el-form-item label="学校:">{{school.sch_name}}</el-form-item>
      <el-form-item label="详细信息:">
        <div v-html="need.context"></div>
      </el-form-item>
      <el-form-item>
        <el-button @click="back">返回列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getNeedOne as get } from "./../../../api/school";
export default {
  data() {
    return {
      need: {},
      school: {}
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async _get(id) {
      let res = await get(id);
      let { data } = res.data;
      this.need = data;
      this.school = this.need.school;
    }
  },
  mounted() {
    this._get(this.$route.params.id);
  }
};
</script>