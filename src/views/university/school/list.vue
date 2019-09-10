<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="small">
      <el-form-item label="学校名称:" prop="name" class="name-input">
        <el-input v-model="ruleForm.name"></el-input>
        <el-button type="primary">查询</el-button>
        <el-button type="success" @click="$router.push('/layout/school/add')">新增学校</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="list" style="width: 100%" :stripe="true">
      <el-table-column prop="id" label="学校编号"></el-table-column>
      <el-table-column prop="sch_name" label="学校名称"></el-table-column>
      <el-table-column prop="rec_school" label="学院援助"></el-table-column>
      <el-table-column prop="is_zup" label="前往援助"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
import { getSchool, remove } from "./../../../api/school";
import { Message } from "element-ui";
export default {
  data() {
    return {
      list: [],
      ruleForm: {
        name
      },
      rules: {
        name: [{ required: true, message: "请输入学校名称", trigger: "blur" }]
      },
      pagination: {
        size: 0, //每页数量
        total: 0, //总
        curr: 0 // 当前
      }
    };
  },
  methods: {
    async _getSchool(curr, size) {
      let res = await getSchool({
        pageNo: curr,
        pageSize: size
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
      this._getSchool(curr, size);
    },
    handleCurrentChange(val) {
      let { size, curr } = this.pagination;
      curr = (val - 1) * 5;
      this._getSchool(curr, size);
    },
    /* 删除 */
    async handleDelete(index, row) {
      let { id } = row;
      let res = await remove(id);
      let { status } = res.data;
      if (status === 200) {
        let { size, curr } = this.pagination;
        this._getSchool(curr, size);
        Message.success("删除成功");
      }
    },
    handleEdit(index, row) {
      this.$router.push("/layout/school/edit/" + row.id);
    }
  },
  mounted() {
    this._getSchool(0, 5);
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