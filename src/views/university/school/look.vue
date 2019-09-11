<template>
  <div>
    <el-form
      :model="school"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="form"
      size="small"
    >
      <el-form-item label="学校编号:">{{school.id}}</el-form-item>
      <el-form-item label="学校名称:" prop="sch_name">{{school.sch_name}}</el-form-item>
      <el-form-item label="需要援助:">{{school.rec_school ? '是' : '否'}}</el-form-item>
      <el-form-item label="前往援助:">{{school.is_zup ? '是' : '否'}}</el-form-item>
      <el-form-item label="详细信息:" ><div v-html="school.message"></div></el-form-item>
      <el-form-item label="援藏历史:" ><div v-html="school.sup_history"></div></el-form-item>
      <el-form-item>
        <el-button @click="back">返回列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { get } from "./../../../api/school";
export default {
  data() {
    return {
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
      this.school = data;
    }
  },
  mounted() {
    this._get(this.$route.params.id);
  }
};
</script>