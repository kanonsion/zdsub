<template>
  <div>
    <el-form :model="manager" ref="ruleForm" label-width="100px" class="form" size="small">
      <el-form-item label="管理员编号">{{manager.id}}</el-form-item>
      <el-form-item label="管理员名称	">{{manager.user_name}}</el-form-item>
      <el-form-item label="所属学校">{{manager.schName}}</el-form-item>
      <el-form-item label="电话">{{manager.telephone}}</el-form-item>
      <el-form-item label="级别">{{manager.roleName}}</el-form-item>
      <el-form-item label="创建时间">{{manager.create_time}}</el-form-item>
      <el-form-item label="创建者	">{{manager.user_name}}</el-form-item>
      <el-form-item>
        <el-button @click="back">返回列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { get, roleList } from "./../../../api/system";
import { Message } from "element-ui";
export default {
  data() {
    return {
      manager: {},
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async _get(id) {
      let res = await get(id);
      let { data } = res.data;
      this.manager = data;
    },
  },
  mounted() {
    this._get(this.$route.params.id);
  }
};
</script>

<style lang="less">
</style>