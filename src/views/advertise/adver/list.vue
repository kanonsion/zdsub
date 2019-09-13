<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="small">
      <el-form-item label="标题:" prop="name" class="name-input">
        <el-input v-model="ruleForm.name"></el-input>
        <el-button type="primary" @click="select">查询</el-button>
        <el-button type="success" @click="$router.push('/layout/adver/add')">新增学校</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="list" style="width: 100%" :stripe="true">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="school.sch_name" label="发布学校" width="100px"></el-table-column>
      <el-table-column prop="read_num" label="阅读量" width="80px"></el-table-column>
      <el-table-column prop="update_time" label="最后更新时间"></el-table-column>
      <el-table-column prop="school.create_user" label="发布者" width="80px"></el-table-column>
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
import { getAdver, remove } from "./../../../api/advertise";
import { Message } from "element-ui";
export default {
  data() {
    return {
      list: [],
      ruleForm: {
        name
      },
      rules: {
        name: [{ required: true, message: "请输入标题", trigger: "blur" }]
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
    async _getAdver(curr, size, condition) {
      let res = await getAdver({
        pageNo: curr,
        pageSize: size,
        condition: {
          title: condition
        }
      });
      let { resultList, pageNo, pageSize, totalCount } = res.data.data;
      this.list = resultList;
      this.pagination = {
        size: pageSize,
        total: totalCount,
        curr: pageNo
      };
    },
    handleSizeChange(val) {
      let { size, curr } = this.pagination;
      size = val;
      this._getAdver(curr, size);
    },
    handleCurrentChange(val) {
      let { size, curr } = this.pagination;
      curr = (val - 1) * 5;
      this._getAdver(curr, size);
    },
    /* 删除 */
    async handleDelete(index, row) {
      let { id } = row;
      let res = await remove(id);
      let { status } = res.data;
      if (status === 200) {
        let { size, curr } = this.pagination;
        this._getAdver(curr, size);
        Message.success("删除成功");
      }
    },
    handleEdit(index, row) {
      this.$router.push("/layout/adver/edit/" + row.id);
    },
    handleLook(index, row) {
      this.$router.push("/layout/adver/look/" + row.id);
    },
    select() {
      let { name } = this.ruleForm;
      this._getManager(0, 5, name);
      this.$router.push({ path: "/layout/manager/list/", query: { name } });
    }
  },
  mounted() {
    this.title = this.$route.query.name || '';
    this._getAdver(0, 5, this.title);
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