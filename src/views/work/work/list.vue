<template>
  <div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" size="small">
      <el-form-item label="标题:" class="name-input">
        <el-input v-model="ruleForm.name"></el-input>
        <el-button type="primary" @click="select">查询</el-button>
        <el-button type="success" @click="$router.push('/layout/work/add')">发布动态</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="list" style="width: 100%" :stripe="true">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="school.sch_name" label="发布学校" width="120px"></el-table-column>
      <el-table-column prop="read_num" label="阅读量" width="120px"></el-table-column>
      <el-table-column prop="uptate_time" label="最后更新时间"></el-table-column>
      <el-table-column prop="create_user.user_name" label="发布者"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button type="info" size="mini" @click="handlelook(scope.$index, scope.row)">查看</el-button>
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
import { getwork, remove_work as remove } from "./../../../api/work";
import { Message } from "element-ui";
export default {
  data() {
    return {
      list: [],
      school: {},
      create_user:{},
      ruleForm: {
        name
      },
      pagination: {
        size: 0, //每页数量
        total: 0, //总
        curr: 0 // 当前
      },
      title: ""
    };
  },
  methods: {
    async _getwork(curr, size, condition) {
      let res = await getwork({
        pageNo: curr,
        pageSize: size,
        condition: {
          title: condition
        }
      });
      let { resultList, pageNo, pageSize, totalCount } = res.data.data;
      this.list = resultList;
      this.school = this.list.school;
      this.create_user = this.list.create_user;
      this.pagination = {
        size: pageSize,
        total: totalCount,
        curr: pageNo
      };
    },
    handleSizeChange(val) {
      let { size, curr } = this.pagination;
      size = val;
      this._getwork(curr, size, this.title);
    },
    handleCurrentChange(val) {
      let { size, curr } = this.pagination;
      curr = (val - 1) * 5;
      this._getwork(curr, size, this.title);
    },
    /* 删除 */
    async handleDelete(index, row) {
      let { id } = row;
      let res = await remove(id);
      let { status } = res.data;
      if (status === 200) {
        let { size, curr } = this.pagination;
        this._getwork(curr, size, this.title);
        Message.success("删除成功");
      }
    },
    handleEdit(index, row) {
      this.$router.push("/layout/work/edit/" + row.id);
    },
    handlelook(index, row) {
      this.$router.push("/layout/work/look/" + row.id);
    },
    select() {
      let { name } = this.ruleForm;
      this._getwork(0, 5, name);
      this.$router.push({ path: "/layout/work/list/", query: { name } });
    }
  },
  mounted() {
    this.title = this.$route.query.name || "";
    this._getwork(0, 5, this.title);
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