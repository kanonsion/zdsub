<template>
  <div>
    <el-form
      :model="adver"
      ref="ruleForm"
      label-width="100px"
      class="form"
      size="small"
    >
      <el-form-item label="学校编号:">{{adver.id}}</el-form-item>
      <el-form-item label="标题:" prop="sch_name">{{adver.title}}</el-form-item>
      <el-form-item label="学校:">{{school.sch_name}}</el-form-item>
      <el-form-item label="详细信息:">
        <div v-html="adver.context"></div>
      </el-form-item>
      <el-form-item>
        <el-button @click="back">返回列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { get } from "./../../../api/advertise";
export default {
  data() {
    return {
      adver: {},
      school:{}
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async _get(id) {
      let res = await get(id);
      let { data } = res.data;
      this.adver = data;
      this.school = this.adver.school
    }
  },
  mounted() {
    this._get(this.$route.params.id);
  }
};
</script>