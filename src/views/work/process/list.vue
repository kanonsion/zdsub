<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="small">
      <el-form-item label="标题:" prop="name" class="name-input">
        <el-input v-model="ruleForm.name"></el-input>
        <el-button type="primary">查询</el-button>
        <el-button type="success" @click="$router.push('/layout/process/add')">新增路线</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="list" style="width: 100%" :stripe="true">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="path_name" label="路线名称"></el-table-column>
      <el-table-column prop="update_time" label="最后更新时间"></el-table-column>
      <el-table-column prop="create_user" label="发布者"></el-table-column>
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
import { getProcess, remove } from "./../../../api/work";
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
      }
    };
  },
  methods: {
    async _getProcess(curr, size) {
      let res = await getProcess({
        pageNo: curr,
        pageSize: size
      });
      let { resultList, pageNo, pageSize, totalCount } = res.data.data;
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
      this._getProcess(curr, size);
    },
    handleCurrentChange(val) {
      let { size, curr } = this.pagination;
      curr = (val - 1) * 5;
      this._getProcess(curr, size);
    },
    /* 删除 */
    async handleDelete(index, row) {
      let { id } = row;
      let res = await remove(id);
      let { status } = res.data;
      if (status === 200) {
        let { size, curr } = this.pagination;
        this._getProcess(curr, size);
        Message.success("删除成功");
      }
    },
    handleEdit(index, row) {
      this.$router.push("/layout/process/edit/" + row.id);
    }
  },
  mounted() {
    this._getProcess(0, 5);
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