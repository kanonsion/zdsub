<template>
  <div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" size="small">
      <el-form-item label="标题:" class="name-input">
        <el-input v-model="ruleForm.name"></el-input>
        <el-button type="primary" @click="select">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="list" style="width: 100%" :stripe="true">
      <el-table-column prop="user_name" label="姓名"></el-table-column>
      <el-table-column prop="telephone" label="电话"></el-table-column>
      <el-table-column prop="qq" label="QQ"></el-table-column>
      <el-table-column prop="course_name" label="课程名"></el-table-column>
      <el-table-column prop="sch_name" label="学校名"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5,10,15,20]"
      :page-size="pagination.size"
      layout="sizes, prev, pager, next"
      :total="pagination.total"
      class="pagination"
    ></el-pagination>
  </div>
</template>

<script>
import { getenterName } from "@/api/advertise";
export default {
  data() {
    return {
      list: [],
      pagination: {
        size: 0, //每页数量
        total: 0, //总
        curr: 0 // 当前
      },
      user_name: "",
      ruleForm: {}
    };
  },
  methods: {
    async _getenterName(curr, size, condition) {
      let res = await getenterName({
        pageNo: curr,
        pageSize: size,
        condition: {
          user_name: condition
        }
      });
      let { resultList, pageNo, pageSize, totalCount } = res.data.page;
      this.list = resultList;
      console.log(res);
      this.pagination = {
        size: pageSize,
        total: totalCount,
        curr: pageNo
      };
    },
    handleSizeChange(val) {
      let { size, curr } = this.pagination;
      size = val;
      this._getenterName(curr, size, this.user_name);
    },
    handleCurrentChange(val) {
      let { size, curr } = this.pagination;
      curr = (val - 1) * 5;
      this._getenterName(curr, size, this.user_name);
    },
    select() {
      let { name } = this.ruleForm;
      this._getenterName(0, 5, name);
      this.$router.push({ path: "/layout/enterName/", query: { name } });
    }
  },
  mounted() {
    this.user_name = this.$route.query.name || "";
    this._getenterName(0, 5, this.user_name);
  }
};
</script>

<style lang="less">
.pagination {
  text-align: right;
  margin-top: 20px;
}
</style>