<template>
  <div>
    <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" size="small">
      <el-form-item label="标题:"  class="name-input">
        <el-input v-model="ruleForm.name"></el-input>
        <el-button type="primary" @click="select">查询</el-button>
        <el-button type="success" @click="$router.push('/layout/role/add')">新增权限</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="list" style="width: 100%" :stripe="true">
      <el-table-column prop="id" label="id" width="100px"></el-table-column>
      <el-table-column prop="role_name" label="权限名称" ></el-table-column>
      <el-table-column prop="cdescription" label="描述" ></el-table-column>
      <el-table-column prop="context" label="备注" ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改权限</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
import { getrole, delById_role as delById } from "./../../../api/system";
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
      role_name: ''
    };
  },
  methods: {
    async _getrole(curr, size, condition) {
      let res = await getrole({
        pageNo: curr,
        pageSize: size,
        condition: {
          role_name:condition
        }
      });
      let { resultList, pageNo, pageSize, totalCount } = res.data.page;
      this.list = resultList;
      console.log(res)
      this.pagination = {
        size: pageSize,
        total: totalCount,
        curr: pageNo
      };
    },
    handleSizeChange(val) {
      let { size, curr } = this.pagination;
      size = val;
      this._getrole(curr, size, this.role_name);
    },
    handleCurrentChange(val) {
      let { size, curr } = this.pagination;
      curr = (val - 1) * 5;
      this._getrole(curr, size, this.role_name);
    },
    /* 删除 */
    async handleDelete(index, row) {
      let { id } = row;
      let res = await delById(id);
      let { status } = res.data;
      if (status === 200) {
        let { size, curr } = this.pagination;
        this._getrole(curr, size, this.role_name);
        Message.success("删除成功");
      }
    },
    handleEdit(index, row) {
      this.$router.push("/layout/role/edit/" + row.id);
    },
    select() {
      let { name } = this.ruleForm;
      this._getrole(0, 5, name)
      this.$router.push({ path: "/layout/role/list/", query: { name } });
    }
  },
  mounted() {
    this.role_name = this.$route.query.name || ''
    this._getrole(0, 5, this.role_name);
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