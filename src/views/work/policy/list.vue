<template>
  <div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" size="small">
      <el-form-item label="标题:" class="name-input">
        <el-input v-model="ruleForm.name"></el-input>
        <el-button type="primary" @click="select">查询</el-button>
        <el-button type="success" @click="$router.push('/layout/policy/add')">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="list" style="width: 100%" :stripe="true">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="title" label="标题" width="100px"></el-table-column>
      <el-table-column prop="update_time" label="最后更新时间" width="120px"></el-table-column>
      <el-table-column prop="create_user.user_name" label="发布者" width="120px"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <a href="javascript:;" @click="handleDownload(scope.$index, scope.row)">下载</a>
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
import { getpolicy, delById_policy as remove, download } from "@/api/work";
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
      title: ""
    };
  },
  methods: {
    async _getpolicy(curr, size, condition) {
      let res = await getpolicy({
        pageNo: curr,
        pageSize: size,
        condition: {
          title: condition
        }
      });
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
      this._getpolicy(curr, size, this.title);
    },
    handleCurrentChange(val) {
      let { size, curr } = this.pagination;
      curr = (val - 1) * 5;
      this._getpolicy(curr, size, this.title);
    },
    /* 删除 */
    async handleDelete(index, row) {
      let { id } = row;
      let res = await remove(id);
      let { status } = res.data;
      if (status === 200) {
        let { size, curr } = this.pagination;
        this._getpolicy(curr, size, this.title);
        Message.success("删除成功");
      }
    },
    handleEdit(index, row) {
      this.$router.push("/layout/policy/edit/" + row.id);
    },
    async handleDownload(index, row) {
      let res = await download(row.url);
      let blob = new Blob([res.data],{type:'application/octet-stream'}); //创建一个blob对象
      let objUrl = URL.createObjectURL(blob)
      window.location.href = objUrl
    },
    select() {
      let { name } = this.ruleForm;
      this._getpolicy(0, 5, name);
      this.$router.push({ path: "/layout/policy/list/", query: { name } });
    }
  },
  mounted() {
    this.title = this.$route.query.name || "";
    this._getpolicy(0, 5, this.title);
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