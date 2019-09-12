<template>
  <div>
    <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" size="small">
      <el-form-item label="标题:"  class="name-input">
        <el-input v-model="ruleForm.name"></el-input>
        <el-button type="primary" @click="select">查询</el-button>
        <el-button type="success" @click="$router.push('/layout/manager/add')">新增学校</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="list" style="width: 100%" :stripe="true">
      <el-table-column prop="id" label="管理员id" width="100px"></el-table-column>
      <el-table-column prop="user_name" label="管理员名称" width="100px"></el-table-column>
      <el-table-column prop="schName" label="所属学校" width="120px"></el-table-column>
      <el-table-column prop="telephone" label="电话" width="120px"></el-table-column>
      <el-table-column prop="roleName" label="级别" width="120px"></el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column prop="createName" width="100px" label="创建者"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button type="info" size="mini" @click="handleLook(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
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
import { getNeed, removeNeed } from "./../../../api/school";
import { Message } from "element-ui";
export default {
  data() {
    return {
      list: [],
      ruleForm: {
        name
      },
      pagination: {
        size: 0, //每页数量
        total: 0, //总
        curr: 0 // 当前
      },
      user_name: ''
    };
  },
  methods: {
    async _getNeed(curr, size, condition) {
      let res = await getNeed({
        pageNo: curr,
        pageSize: size,
        condition: {
          user_name:condition
        }
      });
      console.log(res)
      let { resultList, pageNo, pageSize, totalCount } = res.data.page;
      this.list = resultList;
      console.log(this.list);
      this.pagination = {
        size: pageSize,
        total: totalCount,
        curr: pageNo
      };
    },
    handleSizeChange(val) {
      let { size, curr } = this.pagination;
      size = val;
      this._getNeed(curr, size, this.user_name);
    },
    handleCurrentChange(val) {
      let { size, curr } = this.pagination;
      curr = (val - 1) * 5;
      this._getNeed(curr, size, this.user_name);
    },
    /* 删除 */
    async handleDelete(index, row) {
      let { id } = row;
      let res = await remove(id);
      let { status } = res.data;
      if (status === 200) {
        let { size, curr } = this.pagination;
        this._getNeed(curr, size, this.user_name);
        Message.success("删除成功");
      }
    },
    handleEdit(index, row) {
      this.$router.push("/layout/manager/edit/" + row.id);
    },
    handleLook(index, row) {
      this.$router.push("/layout/manager/look/" + row.id);
    },
    select() {
      let { name } = this.ruleForm;
      this._getNeed(0, 5, name)
      this.$router.push({ path: "/layout/manager/list/", query: { name } });
    }
  },
  mounted() {
    this.user_name = this.$route.query.name
    this._getNeed(0, 5, this.user_name);
  }
};
</script>

<style lang="less">
@import url("./../../../common/css/mixin.less");
.pagination {
  text-align: right;
  margin-top: 20px;
}
</style>